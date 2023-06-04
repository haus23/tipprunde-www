import type { Match, Tip } from '@haus23/tipprunde-types';
import { Link } from '@remix-run/react';
import { InfoBox } from '~/components/(ui)/molecules/info-box';
import { cn } from '~/utils';
import { useChampionshipPlayers } from '~/utils/use-championship-players';

export function MatchTipsTable({ tips, match }: { tips: Record<string, Tip>; match: Match }) {
  const players = useChampionshipPlayers();

  const sortedRows = players;

  return (
    <table className="w-full text-sm">
      <thead className="bg-accent-subtle text-xs uppercase text-accent-foreground">
        <tr>
          <th scope="col" className="w-full px-2 py-3 text-left font-medium sm:px-4 md:px-6">
            Spieler
          </th>
          <th scope="col" className="px-2 text-center font-medium sm:px-4 md:px-6">
            Tipp
          </th>
          <th scope="col" className="px-2 text-center font-medium sm:px-4 md:px-6">
            Punkte
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-hover font-semibold text-subtle-foreground">
        {sortedRows.map((p) => {
          const tip = tips[p.id];
          const highlighted = tip?.joker || tip?.lonelyHit || false;

          return (
            <tr className={cn(highlighted && 'bg-primary')} key={p.id}>
              <td className="w-full px-2 py-2.5 sm:px-4 md:px-6 ">
                <Link
                  to={`../spieler?name=${p.playerId}`}
                  className="inline-block w-full hover:text-accent-foreground hover:underline"
                >
                  {p.account.name}
                </Link>
              </td>
              <td className="relative px-2 text-center sm:px-4 md:px-6">
                <span>{tip?.tip}</span>
                {highlighted && (
                  <span className="absolute right-0">
                    <InfoBox align="end" side="top">
                      <div className="px-4 py-2">
                        {tip?.joker === true && <p>Joker</p>}
                        {tip?.lonelyHit === true && <p>Einziger richtiger Tipp</p>}
                      </div>
                    </InfoBox>
                  </span>
                )}
              </td>
              <td className="px-2 text-center sm:px-4 md:px-6">{match?.result && tip?.points}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
