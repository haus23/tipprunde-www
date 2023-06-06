import { createCookieSessionStorage } from '@remix-run/node';

type SessionData = {
  theme: 'dark' | 'light';
};

type SessionFlashData = {};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session',

    // all of these are optional
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export { getSession, commitSession, destroySession };
