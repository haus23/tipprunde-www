import { useQuery } from '@tanstack/react-query';
import { useRouteLoaderData } from 'react-router';

import { championshipsQuery } from '#/backend/queries';
import type { layoutLoader } from '#/routes/_layout.data';

export function useChampionships() {
  const loaderData = useRouteLoaderData('master') as LoaderType<
    typeof layoutLoader
  >;

  const { data } = useQuery({
    ...championshipsQuery(),
    initialData: loaderData.championships,
  });

  return data;
}
