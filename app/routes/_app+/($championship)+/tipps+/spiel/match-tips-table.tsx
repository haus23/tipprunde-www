import type { Match, Tip } from '@haus23/tipprunde-types';
import { ArrowDownIcon, ArrowUpIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Link } from '~/components/(ui)/atoms/link';
import { InfoBox } from '~/components/(ui)/molecules/info-box';
import { cn } from '~/utils';
import { useChampionshipPlayers } from '~/utils/use-championship-players';
import { useTipSorting } from '~/utils/use-tip-sorting';

export function MatchTipsTable({ tips, match }: { tips: Record<string, Tip>; match: Match }) {
  const players = useChampionshipPlayers();
  const { column, order, toggleSort, sortFn } = useTipSorting();

  const tipsByPlayer = players.map((p) => ({ player: p, tip: tips[p.id] }));

  return (
    <table className="w-full text-sm">
      <thead className="bg-accent-subtle text-xs  text-accent-foreground">
        <tr>
          <th
            aria-sort={column === 'name' ? order : 'none'}
            scope="col"
            className="w-full px-2 py-3 text-left font-medium sm:px-4 md:px-6"
          >
            <button
              className="relative"
              aria-label="Sortierung ändern"
              onClick={() => toggleSort('name')}
            >
              <span className="pr-4 uppercase">Spieler</span>
              {column !== 'name' || order === 'none' ? (
                <ChevronUpDownIcon className="absolute right-0 top-0 h-4" />
              ) : order === 'descending' ? (
                <ArrowDownIcon className="absolute right-[2px] top-[2px] h-3" />
              ) : (
                <ArrowUpIcon className="absolute right-[2px] top-[2px] h-3" />
              )}
            </button>
          </th>
          <th
            aria-sort={column === 'tip' ? order : 'none'}
            scope="col"
            className="px-2 text-center font-medium sm:px-4 md:px-6"
          >
            <button
              className="relative"
              aria-label="Sortierung ändern"
              onClick={() => toggleSort('tip')}
            >
              <span className="pr-4 uppercase">Tip</span>
              {column !== 'tip' || order === 'none' ? (
                <ChevronUpDownIcon className="absolute right-0 top-0 h-4" />
              ) : order === 'descending' ? (
                <ArrowDownIcon className="absolute right-[2px] top-[2px] h-3" />
              ) : (
                <ArrowUpIcon className="absolute right-[2px] top-[2px] h-3" />
              )}
            </button>
          </th>
          <th
            aria-sort={column === 'points' ? order : 'none'}
            scope="col"
            className="px-2 text-center font-medium sm:px-4 md:px-6"
          >
            <button
              className="relative"
              aria-label="Sortierung ändern"
              onClick={() => toggleSort('points')}
            >
              <span className="pr-4 uppercase">Punkte</span>
              {column !== 'points' || order === 'none' ? (
                <ChevronUpDownIcon className="absolute right-0 top-0 h-4" />
              ) : order === 'descending' ? (
                <ArrowDownIcon className="absolute right-[2px] top-[2px] h-3" />
              ) : (
                <ArrowUpIcon className="absolute right-[2px] top-[2px] h-3" />
              )}
            </button>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-neutral-hover font-semibold text-subtle-foreground">
        {tipsByPlayer.sort(sortFn).map(({ player, tip }) => {
          const highlighted = tip?.joker || tip?.lonelyHit || false;

          return (
            <tr className={cn(highlighted && 'bg-primary')} key={player.id}>
              <td className="w-full px-2 py-2.5 sm:px-4 md:px-6 ">
                <Link
                  prefetch="intent"
                  to={`../spieler?name=${player.playerId}`}
                  className="inline-block w-full hover:text-accent-foreground hover:underline"
                >
                  {player.account.name}
                </Link>
              </td>
              <td className="relative pl-2 pr-6 text-center sm:pl-4 md:pl-6">
                <span>{tip?.tip}</span>
                {highlighted && (
                  <span className="absolute right-0">
                    <InfoBox align="end" side="top" ariaTriggerLabel="Zusatzinfos zum Tipp">
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
