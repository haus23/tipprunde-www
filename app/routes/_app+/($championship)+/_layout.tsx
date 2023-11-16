import { json, type DataFunctionArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { fetchChampionshipPlayers } from '~/backend/queries';

export const loader = async ({ params }: DataFunctionArgs) => {
  const players = await fetchChampionshipPlayers(params.championship);

  return json({ players });
};

export default function ChampionshipLayout() {
  return <Outlet />;
}
