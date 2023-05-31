import { getChampionshipMatches } from './route-match-helper';
import { useMatches } from '@remix-run/react';

export function useChampionshipMatches() {
  return getChampionshipMatches(useMatches());
}
