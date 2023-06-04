import type { Championship, Matches, Player } from '@haus23/tipprunde-types';
import type { RouteMatch } from '@remix-run/react';

export function getChampionships(matches: RouteMatch[]) {
  const appMatch = matches.find((m) => m.id === 'root');
  return appMatch?.data.championships as Championship[];
}

export function getChampionship(championshipId: string | undefined, matches: RouteMatch[]) {
  const championships = getChampionships(matches);

  const championship = championships.find((c) => c.id === championshipId) || championships[0];
  return championship;
}

export function getChampionshipPlayers(matches: RouteMatch[]) {
  const championshipMatch = matches.find((m) => m.id === 'routes/($championship)+/_layout');
  return championshipMatch?.data.players as Player[];
}

export function getChampionshipMatches(matches: RouteMatch[]) {
  const tippsMatch = matches.find((m) => m.id === 'routes/($championship)+/tipps+/_layout');
  return tippsMatch?.data.matches as Matches;
}
