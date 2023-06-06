import { json } from '@remix-run/node';
import { Outlet, type ShouldRevalidateFunction } from '@remix-run/react';
import { fetchChampionships } from '~/backend/queries';

export const loader = async () => {
  const championships = await fetchChampionships();
  return json({ championships });
};

export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export default function AppLayout() {
  return <Outlet />;
}
