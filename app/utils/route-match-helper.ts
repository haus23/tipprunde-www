import type { Championship } from '@haus23/tipprunde-types';
import type { RouteMatch } from '@remix-run/react';

export function getChampionships(matches: RouteMatch[]) {
  const appMatch = matches.find((m) => m.id === 'routes/_app');
  return appMatch?.data as Championship[];
}

export function getChampionship(championshipId: string | undefined, matches: RouteMatch[]) {
  const championships = getChampionships(matches);

  const championship = championships.find((c) => c.id === championshipId) || championships[0];
  return championship;
}