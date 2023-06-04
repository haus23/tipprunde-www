import type { SerializeFrom } from '@remix-run/node';
import { useRouteLoaderData } from '@remix-run/react';
import type { loader as rootLoader } from '~/root';

export function useChampionships() {
  const data = useRouteLoaderData('root') as SerializeFrom<typeof rootLoader>;
  return data.championships;
}
