import { json, type LoaderArgs } from '@remix-run/node';
import { Outlet, type ShouldRevalidateFunction } from '@remix-run/react';
import { fetchMatches } from '~/backend/queries';

export const loader = async ({ params }: LoaderArgs) => {
  const matches = await fetchMatches(params.championship);
  return json({ matches });
};

export const shouldRevalidate: ShouldRevalidateFunction = ({ currentParams, nextParams }) => {
  return currentParams.championship !== nextParams.championship;
};

export default function StandingsLayout() {
  return <Outlet />;
}
