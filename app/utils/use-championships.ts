import { getChampionships } from './route-match-helper';
import { useMatches } from '@remix-run/react';

export function useChampionships() {
  return getChampionships(useMatches());
}
