import type { Championship } from '@haus23/tipprunde-types';
import { useRouteLoaderData } from '@remix-run/react';

export function useChampionships() {
  return useRouteLoaderData('routes/_app') as Championship[];
}
