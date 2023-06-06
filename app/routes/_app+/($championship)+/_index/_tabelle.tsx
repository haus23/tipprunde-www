import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { json, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { Fragment } from 'react';
import { fetchCurrentTips } from '~/backend/queries';
import { InfoBox } from '~/components/(ui)/molecules/info-box';
import { cn } from '~/utils';
import { getChampionship } from '~/utils/route-match-helper';
import { useChampionship } from '~/utils/use-championship';
import { useChampionshipPlayers } from '~/utils/use-championship-players';

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const championship = getChampionship(params.championship, matches);
  return [{ title: `Tabelle ${championship.name} - runde.tips` }];
};

export const handle = { viewPath: '' };

export const loader = async ({ params }: LoaderArgs) => {
  return json(await fetchCurrentTips(params.championship));
};

export default function Tabelle() {
  const championship = useChampionship();
  const players = useChampionshipPlayers();

  const currentTips = useLoaderData<typeof loader>();

  return (
    <>
      <header className="mx-2 flex items-center gap-x-2 pt-2 text-accent-foreground sm:mx-0 sm:gap-x-4">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden sm:block">{championship.name} -</span>
          <span>{championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}</span>
        </h2>
      </header>
      <table className="mt-4 w-full text-sm">
        <thead className="bg-accent-subtle text-xs uppercase text-accent-foreground">
          <tr>
            <th scope="col" className="py-3 pl-4 pr-2 text-right font-medium md:px-6">
              Platz
            </th>
            <th scope="col" className="px-2 text-left font-medium md:px-6">
              Name
            </th>
            {championship.extraPointsPublished && (
              <th scope="col" className="px-2 text-center font-medium md:px-6 ">
                <span className="hidden sm:inline">Zusatzpunkte</span>
                <span className="sm:hidden">Zusatzpkt</span>
              </th>
            )}
            <th scope="col" className="px-2 text-center font-medium last:pr-4 md:px-6">
              <span className="hidden sm:inline">
                {championship.extraPointsPublished ? 'Gesamtpunkte' : 'Punkte'}
              </span>
              <span className="sm:hidden">
                {championship.extraPointsPublished ? 'Gesamt' : 'Punkte'}
              </span>
            </th>
            {!championship.completed && (
              <th>
                <span className="sr-only">Aktuelle Spiele</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-hover font-semibold text-subtle-foreground">
          {players.map((p, ix) => {
            const currentRank =
              ix === 0 ? '1.' : p.rank !== players[ix - 1].rank ? `${p.rank}.` : '';
            return (
              <tr key={p.id}>
                <td className="pl-4 pr-2 text-right md:px-6">{currentRank}</td>
                <td className="w-full px-2 py-2.5 md:px-6">
                  <Link
                    className="block hover:text-accent-foreground hover:underline"
                    to={`tipps/spieler?name=${p.playerId}`}
                  >
                    {p.account.name}
                  </Link>
                </td>
                {championship.extraPointsPublished && (
                  <td className="px-2 text-center md:px-6">{p.extraPoints}</td>
                )}
                <td className="px-2 text-center last:pr-4 md:px-6">{p.totalPoints}</td>
                {!championship.completed && (
                  <td>
                    <div className="flex items-center pr-2">
                      <InfoBox
                        side="top"
                        collisionPadding={8}
                        icon={CalendarDaysIcon}
                        ariaTriggerLabel={`Aktuelle Tips von ${p.account.name}`}
                      >
                        <div className="grid w-[240px] grid-cols-[1fr_repeat(2,_auto)] pb-2 text-sm font-normal">
                          <div className="border-b border-line py-2 pl-2">Spiel</div>
                          <div className="border-b border-line p-2 text-center">Tipp</div>
                          <div className="border-b border-line p-2 text-center">Pkt</div>
                          {currentTips.map((m) => {
                            const tip = m.tips[p.id];
                            return (
                              <Fragment key={m.matchId}>
                                <div
                                  className={cn(
                                    'py-1 pl-2',
                                    (tip?.joker || tip?.lonelyHit) && 'bg-primary'
                                  )}
                                >
                                  {m.hometeam}-{m.awayteam}
                                </div>
                                <div
                                  className={cn(
                                    'py-1 text-center',
                                    (tip?.joker || tip?.lonelyHit) && 'bg-primary'
                                  )}
                                >
                                  {tip?.tip}
                                </div>
                                <div
                                  className={cn(
                                    'py-1 text-center',
                                    (tip?.joker || tip?.lonelyHit) && 'bg-primary'
                                  )}
                                >
                                  {m.result && tip?.points}
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </InfoBox>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
