import { json, type ActionArgs } from '@remix-run/node';
import type { Theme } from '~/utils/color-theme';
import { getSession, commitSession } from '~/utils/server/session';

export const action = async function ({ request }: ActionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme') as Theme;

  session.set('theme', theme);

  return json({ success: true }, { headers: { 'Set-Cookie': await commitSession(session) } });
};
