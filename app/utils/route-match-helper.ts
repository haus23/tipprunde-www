import type { SerializeFrom } from '@remix-run/node';
import type { RouteMatch } from '@remix-run/react';

import type { loader as rootLoader } from '~/root';
import type { loader as championshipLayoutLoader } from '~/routes/($championship)+/_layout';
import type { loader as tippDetailsLoader } from '~/routes/($championship)+/tipps+/_layout';

export function getChampionships(matches: RouteMatch[]) {
  const match = matches.find((m) => m.id === 'root');
  const data = match?.data as SerializeFrom<typeof rootLoader>;
  return data.championships;
}

export function getChampionship(championshipId: string | undefined, matches: RouteMatch[]) {
  const championships = getChampionships(matches);

  const championship = championships.find((c) => c.id === championshipId) || championships[0];
  return championship;
}

export function getChampionshipPlayers(matches: RouteMatch[]) {
  const match = matches.find((m) => m.id === 'routes/($championship)+/_layout');

  const data = match?.data as SerializeFrom<typeof championshipLayoutLoader>;
  return data.players;
}

export function getChampionshipMatches(matches: RouteMatch[]) {
  const match = matches.find((m) => m.id === 'routes/($championship)+/tipps+/_layout');

  const data = match?.data as SerializeFrom<typeof tippDetailsLoader>;
  return data.matches;
}
