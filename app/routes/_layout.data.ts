import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router';
import {
  championshipsQuery,
  matchesQuery,
  playersQuery,
} from '#/backend/queries';

export const layoutLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    let { championshipId } = params;
    const championships = await queryClient.ensureQueryData(
      championshipsQuery(),
    );

    if (championshipId && !championships.find((c) => c.id === championshipId))
      throw new Response('Not Found', { status: 404 });

    if (!championshipId) championshipId = championships[0].id;

    const players = await queryClient.ensureQueryData(
      playersQuery(championshipId),
    );

    const matches = await queryClient.ensureQueryData(
      matchesQuery(championshipId),
    );

    return { championships, matches, players };
  };
