import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router';
import { championshipsQuery, matchTipsQuery } from '#/backend/queries';

export const matchesLoader =
  (queryClient: QueryClient) =>
  async ({ params, request }: LoaderFunctionArgs) => {
    let { championshipId } = params;
    const nr = new URL(request.url).searchParams.get('nr');

    const championships = await queryClient.ensureQueryData(
      championshipsQuery(),
    );

    if (!championshipId) championshipId = championships[0].id;

    const data = await queryClient.ensureQueryData(
      matchTipsQuery(championshipId, nr),
    );

    return data;
  };
