import { json, type DataFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { fetchChampionships } from '~/backend/queries';

export const loader = async ({ params }: DataFunctionArgs) => {
  const { championship: championshipId } = params;

  const championships = await fetchChampionships();

  if (championshipId && !championships.find((c) => c.id === championshipId)) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return json({ championships });
};

export default function AppLayout() {
  return <Outlet />;
}
