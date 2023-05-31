import { getChampionshipPlayers } from './route-match-helper';
import { useMatches } from '@remix-run/react';

export function useChampionshipPlayers() {
  return getChampionshipPlayers(useMatches());
}
