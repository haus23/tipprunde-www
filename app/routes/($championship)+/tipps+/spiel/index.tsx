import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { json, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { fetchMatchTips } from '~/backend/queries';

import { Select } from '~/components/(ui)/elements/select';
import { InfoBox } from '~/components/(ui)/molecules/info-box';

import { formatDate } from '~/utils';
import { getChampionship, getChampionshipMatches } from '~/utils/route-match-helper';
import { useChampionship } from '~/utils/use-championship';
import { useChampionshipMatches } from '~/utils/use-championship-matches';
import { MatchTipsTable } from './match-tips-table';

export const meta: V2_MetaFunction = ({ matches: routeMatches, params, data }) => {
  const championship = getChampionship(params.championship, routeMatches);
  const { matches, teams } = getChampionshipMatches(routeMatches);

  const match = matches.find((m) => m.id === data.matchId) || matches[0];
  return [
    {
      title: `Tipps ${teams[match.hometeamId].shortname} - ${teams[match.awayteamId].shortname}  ${
        championship.name
      } - runde.tips`,
    },
  ];
};

export const handle = { viewPath: 'tipps/spiel' };

export const loader = async ({ params, request }: LoaderArgs) => {
  const nr = new URL(request.url).searchParams.get('nr');
  return json(await fetchMatchTips(nr, params.championship));
};

export default function Spiel() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { matchId, tips } = useLoaderData<typeof loader>();

  const championship = useChampionship();
  const { matches, teams, leagues, rounds } = useChampionshipMatches();

  const match = matches.find((m) => m.id === matchId) || matches[0];

  function handleSelect(value: string) {
    const nr = matches.find((m) => m.id === value)?.nr;
    setSearchParams({ ...searchParams, nr: String(nr) });
  }

  return (
    <>
      <header className="sticky top-0 z-10 mx-2 flex items-center gap-x-4 bg-background pb-2 pt-1 text-accent-foreground sm:mx-0 sm:gap-x-4">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden py-1 sm:block">{championship.name} -</span>
          <span className="py-1">Tipps für</span>
        </h2>
        <Select
          value={match.id}
          onValueChanged={handleSelect}
          options={matches}
          display={(m) => `${teams[m.hometeamId].shortname} - ${teams[m.awayteamId].shortname}`}
          groups={rounds}
          groupKey="roundId"
          groupDisplay={(r) => `Runde ${r.nr}`}
        />
      </header>
      <div className="mx-2 mt-6 max-w-3xl text-sm md:mx-auto">
        <div className="flex w-full justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Wann</p>
            <p className="font-semibold text-accent-foreground">{formatDate(match.date)}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Wo</p>
            <p className="font-semibold text-accent-foreground">{leagues[match.leagueId].name}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Ergebnis</p>
            <p className="font-semibold text-accent-foreground">{match.result}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Punkte</p>
            <p className="font-semibold text-accent-foreground">{match.result && match.points}</p>
          </div>
        </div>
        {rounds.find((r) => r.id === match.roundId)?.isDoubleRound ? (
          <div className="mt-4 flex justify-center gap-x-2 text-subtle-foreground">
            <span className="sm:hidden">
              <InfoBox icon={ExclamationTriangleIcon}>
                <div className="px-4 py-2">Alle erzielten Punkte werden verdoppelt.</div>
              </InfoBox>
            </span>
            <span>Das Spiel läuft in einer Doppelrunde.</span>
            <span className="hidden sm:block">Alle erzielten Punkte werden verdoppelt.</span>
          </div>
        ) : null}
      </div>
      <div className="mt-6">
        <MatchTipsTable tips={tips} match={match} />
      </div>
    </>
  );
}
