import { useChampionships } from './use-championships';

export function useChampionship(championshipId?: string) {
  const championships = useChampionships();

  const championship = championships.find((c) => c.id === championshipId) || championships[0];
  return championship;
}
