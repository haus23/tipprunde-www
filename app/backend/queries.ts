import { Championship, CurrentTips, Matches, Player, Tip } from '@haus23/tipprunde-types';
import { z } from 'zod';

const baseUrl = `${process.env.BACKEND_HOST_URL}/api/v1`;

export async function fetchChampionships() {
  const response = await fetch(`${baseUrl}/championships`);
  return z.array(Championship).parseAsync(await response.json());
}

export async function fetchChampionshipPlayers(championshipId?: string) {
  championshipId = championshipId ?? 'current';

  const response = await fetch(`${baseUrl}/championships/${championshipId}/players`);
  return z.array(Player).parseAsync(await response.json());
}

export async function fetchCurrentTips(championshipId?: string) {
  championshipId = championshipId ?? 'current';

  const response = await fetch(`${baseUrl}/championships/${championshipId}/current-tips`);
  return CurrentTips.parseAsync(await response.json());
}

export async function fetchMatches(championshipId?: string) {
  championshipId = championshipId ?? 'current';

  const response = await fetch(`${baseUrl}/championships/${championshipId}/matches`);
  return Matches.parseAsync(await response.json());
}

export async function fetchPlayerTips(playerId: string | null, championshipId: string | undefined) {
  championshipId = championshipId ?? 'current';
  const query = playerId ? `?name=${playerId}` : '';

  const url = `${baseUrl}/championships/${championshipId}/player-tips${query}`;
  const response = await fetch(url);
  return z.record(Tip).parseAsync(await response.json());
}
