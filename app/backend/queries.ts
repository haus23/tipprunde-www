import {
  Championship,
  CurrentTips,
  MatchTips,
  Matches,
  Player,
  PlayerTips,
} from '@haus23/tipprunde-types';
import { queryOptions } from '@tanstack/react-query';
import { z } from 'zod';

const backendHost = 'https://backend.runde.tips';
const baseUrl = `${backendHost}/api/v1`;

async function fetchChampionships() {
  console.log('Fetching championships');
  const response = await fetch(`${baseUrl}/championships`);
  return z.array(Championship).parseAsync(await response.json());
}

export const championshipsQuery = () =>
  queryOptions({
    queryKey: ['championships'],
    queryFn: fetchChampionships,
  });

async function fetchPlayers(championshipId: string) {
  console.log('Fetching championship players', championshipId);
  const response = await fetch(
    `${baseUrl}/championships/${championshipId}/players`,
  );
  return z.array(Player).parseAsync(await response.json());
}

export const playersQuery = (championshipId: string) =>
  queryOptions({
    queryKey: ['players', championshipId],
    queryFn: () => fetchPlayers(championshipId),
  });

async function fetchCurrentTips(championshipId: string) {
  console.log('Fetching current tips', championshipId);
  const response = await fetch(
    `${baseUrl}/championships/${championshipId}/current-tips`,
  );
  return CurrentTips.parseAsync(await response.json());
}

export const currentTipsQuery = (championshipId: string) =>
  queryOptions({
    queryKey: ['current-tips', championshipId],
    queryFn: () => fetchCurrentTips(championshipId),
  });

export async function fetchMatches(championshipId?: string) {
  const response = await fetch(
    `${baseUrl}/championships/${championshipId ?? 'current'}/matches`,
  );
  return Matches.parseAsync(await response.json());
}

export async function fetchPlayerTips(
  accountId: string | null,
  championshipId: string | undefined,
) {
  const query = accountId ? `?name=${accountId}` : '';

  const url = `${baseUrl}/championships/${championshipId ?? 'current'}/player-tips${query}`;
  const response = await fetch(url);
  return PlayerTips.parseAsync(await response.json());
}

export async function fetchMatchTips(
  nr: string | null,
  championshipId: string | undefined,
) {
  const query = nr ? `?nr=${nr}` : '';

  const url = `${baseUrl}/championships/${championshipId ?? 'current'}/match-tips${query}`;
  const response = await fetch(url);
  if (response.status === 404) {
    throw response;
  }

  return MatchTips.parseAsync(await response.json());
}
