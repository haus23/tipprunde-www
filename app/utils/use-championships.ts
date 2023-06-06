import type { SerializeFrom } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import type { loader as appLoader } from '~/routes/_app+/_layout';

export function useChampionships() {
  const data = useRouteLoaderData('routes/_app+/_layout') as SerializeFrom<typeof appLoader>;
  return data.championships;
}
