import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router';
import {
  championshipsQuery,
  playerTipsQuery,
  playersQuery,
} from '#/backend/queries';

export const playersLoader =
  (queryClient: QueryClient) =>
  async ({ params, request }: LoaderFunctionArgs) => {
    let { championshipId } = params;
    let accountId = new URL(request.url).searchParams.get('name');

    const championships = await queryClient.ensureQueryData(
      championshipsQuery(),
    );

    if (!championshipId) championshipId = championships[0].id;

    const players = await queryClient.ensureQueryData(
      playersQuery(championshipId),
    );

    if (!accountId) accountId = players[0].account.id;

    const data = await queryClient.ensureQueryData(
      playerTipsQuery(championshipId, accountId),
    );

    return data;
  };
