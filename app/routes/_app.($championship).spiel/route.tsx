import { type V2_MetaFunction } from '@remix-run/node';

import { getChampionship, getChampionshipMatches } from '~/utils/route-match-helper';
import { useChampionship } from '~/utils/use-championship';

export const meta: V2_MetaFunction = ({ matches: routeMatches, params, location }) => {
  const championship = getChampionship(params.championship, routeMatches);
  const { matches, teams } = getChampionshipMatches(routeMatches);

  const matchQuery = new URLSearchParams(location.search).get('nr');
  const match = matches.find((m) => m.nr === Number(matchQuery)) || matches[0];
  return [
    {
      title: `Tipps ${teams[match.hometeamId].shortname} - ${teams[match.awayteamId].shortname}  ${
        championship.name
      } - runde.tips`,
    },
  ];
};

export default function Spieler() {
  const championship = useChampionship();

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center gap-x-4 bg-background px-2 pb-2 pt-1 text-accent-foreground sm:mx-0 sm:gap-x-4">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden py-1 sm:block">{championship.name} -</span>
          <span className="py-1">Tipps für</span>
        </h2>
      </header>
    </>
  );
}
