import { json, type LoaderArgs } from '@remix-run/node';
import { Outlet } from '@remix-run/react';
import { fetchChampionshipPlayers } from '~/backend/queries';

export const loader = async ({ params }: LoaderArgs) => {
  return json(await fetchChampionshipPlayers(params.championship));
};

export default function StandingsLayout() {
  return <Outlet />;
}
