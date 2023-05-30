import { useMatches, useParams } from '@remix-run/react';
import { getChampionship } from './route-match-helper';

export function useChampionship() {
  const { championship: championshipId } = useParams();

  return getChampionship(championshipId, useMatches());
}
