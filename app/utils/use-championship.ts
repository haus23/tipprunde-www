import { useMatches } from '@remix-run/react';
import { getChampionship } from './route-match-helper';

export function useChampionship(championshipId?: string) {
  return getChampionship(championshipId, useMatches());
}
