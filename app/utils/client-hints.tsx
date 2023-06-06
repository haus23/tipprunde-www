/**
 * This file contains utilities for using client hints for user preference which
 * are needed by the server, but are only known by the browser.
 *
 * See https://web.dev/user-preference-media-features-headers/
 * See https://github.com/epicweb-dev/epic-stack/blob/main/docs/client-hints.md
 * See https://github.com/epicweb-dev/epic-stack/blob/main/docs/decisions/005-client-pref-cookies.md
 *
 */

import { useEffect } from 'react';
import { useTheme } from './color-theme';

export const clientHints = {
  theme: {
    cookieName: 'CH-prefers-color-scheme',
    getValueCode: `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`,
    fallback: 'dark',
    transform(value: string | null) {
      return value === 'light' ? 'light' : 'dark';
    },
  },
};

type ClientHintNames = keyof typeof clientHints;

/**
 *
 * @param cookieString cookie string as stored in the browser or in the cookie header
 * @param name client hint (currently only theme)
 * @returns cookie value or null
 */
function getCookieValue(cookieString: string, name: ClientHintNames) {
  const hint = clientHints[name];
  if (!hint) {
    throw new Error(`Unknown client hint: ${name}`);
  }
  const value = cookieString
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(hint.cookieName + '='))
    ?.split('=')[1];

  return value ?? null;
}

/**
 * Extract client hints from request or browser
 *
 * @param request {Request} - optional request object (only used on server)
 * @returns an object with the client hints and their values
 */
export function getHints(request?: Request) {
  const cookieString =
    typeof document !== 'undefined'
      ? document.cookie
      : typeof request !== 'undefined'
      ? request.headers.get('Cookie') ?? ''
      : '';

  return Object.entries(clientHints).reduce(
    (acc, [name, hint]) => {
      const hintName = name as ClientHintNames;
      acc[hintName] = hint.transform(getCookieValue(cookieString, hintName));
      return acc;
    },
    {} as {
      [name in ClientHintNames]: ReturnType<(typeof clientHints)[name]['transform']>;
    }
  );
}

/**
 * @returns inline script element that checks for client hints and sets cookies
 * if they are not set then reloads the page if any cookie was set to an
 * inaccurate value.
 */
export function ClientHintCheck() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    function handleThemeChange() {
      const theme = themeQuery.matches ? 'dark' : 'light';
      document.cookie = `${clientHints.theme.cookieName}=${theme}`;
      setTheme(theme);
    }
    themeQuery.addEventListener('change', handleThemeChange);
    return () => {
      themeQuery.removeEventListener('change', handleThemeChange);
    };
  }, [setTheme]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
const cookies = document.cookie.split(';').map(c => c.trim()).reduce((acc, cur) => {
	const [key, value] = cur.split('=');
	acc[key] = value;
	return acc;
}, {});
let cookieChanged = false;
const hints = [
${Object.values(clientHints)
  .map((hint) => {
    const cookieName = JSON.stringify(hint.cookieName);
    return `{ name: ${cookieName}, actual: String(${hint.getValueCode}), cookie: cookies[${cookieName}] }`;
  })
  .join(',\n')}
];
for (const hint of hints) {
	if (hint.cookie !== hint.actual) {
		cookieChanged = true;
		document.cookie = hint.name + '=' + hint.actual;
	}
}
if (cookieChanged) {
	window.location.reload();
}
			`,
      }}
    />
  );
}
