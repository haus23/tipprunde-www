import { useQuery } from '@tanstack/react-query';
import { useParams, useRouteLoaderData } from 'react-router';

import { championshipsQuery } from '#/backend/queries';
import type { layoutLoader } from '#/routes/_layout.data';

export function useChampionship() {
  const { championshipId } = useParams();
  const loaderData = useRouteLoaderData('layout') as LoaderType<
    typeof layoutLoader
  >;

  const { data } = useQuery({
    ...championshipsQuery(),
    initialData: loaderData.championships,
  });

  return data.find((c) => c.id === championshipId) || data[0];
}
