import type { SerializeFrom } from '@remix-run/node';
import type { MetaArgs, UIMatch } from '@remix-run/react';

import type { loader as appLoader } from '~/routes/_app+/_layout';
import type { loader as championshipLayoutLoader } from '~/routes/_app+/($championship)+/_layout';
import type { loader as tippDetailsLoader } from '~/routes/_app+/($championship)+/tipps+/_layout';

type RouteMatches = MetaArgs['matches'] | UIMatch[];

export function getChampionships(matches: RouteMatches) {
  const match = matches.find((m) => m.id === 'routes/_app+/_layout');
  const data = match?.data as SerializeFrom<typeof appLoader>;
  return data.championships;
}

export function getChampionship(championshipId: string | undefined, matches: RouteMatches) {
  const championships = getChampionships(matches);

  const championship = championships.find((c) => c.id === championshipId) || championships[0];
  return championship;
}

export function getChampionshipPlayers(matches: RouteMatches) {
  const match = matches.find((m) => m.id === 'routes/_app+/($championship)+/_layout');

  const data = match?.data as SerializeFrom<typeof championshipLayoutLoader>;
  return data.players;
}

export function getChampionshipMatches(matches: RouteMatches) {
  const match = matches.find((m) => m.id === 'routes/_app+/($championship)+/tipps+/_layout');

  const data = match?.data as SerializeFrom<typeof tippDetailsLoader>;
  return data.matches;
}
