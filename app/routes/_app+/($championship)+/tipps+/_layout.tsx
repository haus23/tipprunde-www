import { json, type DataFunctionArgs } from '@remix-run/node';
import { Outlet, type ShouldRevalidateFunction } from '@remix-run/react';
import { fetchMatches } from '~/backend/queries';

export const loader = async ({ params }: DataFunctionArgs) => {
  const matches = await fetchMatches(params.championship);
  return json({ matches });
};

export const shouldRevalidate: ShouldRevalidateFunction = ({ currentParams, nextParams }) => {
  return currentParams.championship !== nextParams.championship;
};

export default function TippDetailsLayout() {
  return <Outlet />;
}
