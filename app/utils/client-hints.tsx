import { useEffect } from 'react';

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

/**
 * See https://web.dev/user-preference-media-features-headers/
 * See https://github.com/epicweb-dev/epic-stack/blob/main/docs/client-hints.md
 * See https://github.com/epicweb-dev/epic-stack/blob/main/docs/decisions/005-client-pref-cookies.md
 *
 * @returns  inline script element that checks for client hints and sets cookies
 * if they are not set then reloads the page if any cookie was set to an
 * inaccurate value.
 */
export function ClientHintCheck() {
  useEffect(() => {
    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    function handleThemeChange() {
      document.cookie = `${clientHints.theme.cookieName}=${themeQuery.matches ? 'dark' : 'light'}`;
    }
    themeQuery.addEventListener('change', handleThemeChange);
    return () => {
      themeQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

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
