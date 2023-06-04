import { Outlet, type ShouldRevalidateFunction } from '@remix-run/react';
import { json } from '@remix-run/node';
import { fetchChampionships } from '~/backend/queries';

export const loader = async () => {
  return json(await fetchChampionships());
};

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return false;
};

export default function AppLayout() {
  return <Outlet />;
}
