import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router';
import {
  championshipsQuery,
  playerTipsQuery,
  playersQuery,
} from '#/backend/queries';
import { getCurrentChampionship } from '#/utils/app/current-championship.server';

export const playersLoader =
  (queryClient: QueryClient) =>
  async ({ params, request }: LoaderFunctionArgs) => {
    let accountId = new URL(request.url).searchParams.get('name');

    const championships = await queryClient.ensureQueryData(
      championshipsQuery(),
    );

    const championship = getCurrentChampionship(championships, params);

    const players = await queryClient.ensureQueryData(
      playersQuery(championship.id),
    );

    if (!accountId) accountId = players[0].account.id;

    const data = await queryClient.ensureQueryData(
      playerTipsQuery(championship.id, accountId),
    );

    return data;
  };
