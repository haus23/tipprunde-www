import { json, type LoaderArgs } from '@remix-run/node';
import { Outlet, type ShouldRevalidateFunction } from '@remix-run/react';
import { fetchChampionshipPlayers } from '~/backend/queries';

export const loader = async ({ params }: LoaderArgs) => {
  const players = await fetchChampionshipPlayers(params.championship);

  return json({ players });
};

export const shouldRevalidate: ShouldRevalidateFunction = ({ currentParams, nextParams }) => {
  return currentParams.championship !== nextParams.championship;
};

export default function ChampionshipLayout() {
  return <Outlet />;
}
