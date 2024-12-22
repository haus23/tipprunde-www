import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { invariant } from '../misc';

import { championshipsQuery } from '#/backend/queries';

export function useChampionship() {
  const { championshipId } = useParams();
  const { data } = useQuery(championshipsQuery());
  invariant(data);

  return data.find((c) => c.id === championshipId) || data[0];
}
