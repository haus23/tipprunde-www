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

async function fetchMatches(championshipId: string) {
  console.log('Fetching championship matches', championshipId);
  const response = await fetch(
    `${baseUrl}/championships/${championshipId}/matches`,
  );
  return Matches.parseAsync(await response.json());
}

export const matchesQuery = (championshipId: string) =>
  queryOptions({
    queryKey: ['matches', championshipId],
    queryFn: () => fetchMatches(championshipId),
  });

async function fetchPlayerTips(championshipId: string, accountId: string) {
  console.log('Fetching tips', championshipId, accountId);
  const query = `?name=${accountId}`;

  const url = `${baseUrl}/championships/${championshipId}/player-tips${query}`;
  const response = await fetch(url);
  return PlayerTips.parseAsync(await response.json());
}

export const playerTipsQuery = (championshipId: string, accountId: string) =>
  queryOptions({
    queryKey: ['player-tips', championshipId, accountId],
    queryFn: () => fetchPlayerTips(championshipId, accountId),
  });

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
