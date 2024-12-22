import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router';
import { championshipsQuery, currentTipsQuery } from '#/backend/queries';

export const tablesLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    let { championshipId } = params;

    const championships = await queryClient.ensureQueryData(
      championshipsQuery(),
    );

    if (!championshipId) championshipId = championships[0].id;

    const currentTips = await queryClient.ensureQueryData(
      currentTipsQuery(championshipId),
    );

    return { currentTips };
  };
