import { getPlayers } from './route-match-helper';
import { useMatches } from '@remix-run/react';

export function usePlayers() {
  return getPlayers(useMatches());
}
