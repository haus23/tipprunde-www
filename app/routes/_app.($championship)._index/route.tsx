import { type V2_MetaFunction } from '@remix-run/node';
import { getChampionship } from '~/utils/route-match-helper';
import { useChampionship } from '~/utils/use-championship';
import { usePlayers } from '~/utils/use-players';

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const championship = getChampionship(params.championship, matches);
  return [{ title: `Tabelle ${championship.name} - runde.tips` }];
};

export default function Tabelle() {
  const championship = useChampionship();
  const players = usePlayers();

  return (
    <>
      <header className="mx-2 flex items-center gap-x-2 text-accent-foreground sm:mx-0 sm:gap-x-4">
        <h2 className="flex gap-x-2 pb-1 text-xl font-semibold tracking-tight">
          <span className="hidden sm:block">{championship.name} -</span>
          <span>{championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}</span>
        </h2>
      </header>
      <table className="mt-4 w-full text-sm sm:text-base">
        <thead className="bg-accent-subtle text-xs uppercase text-accent-foreground sm:text-sm">
          <tr>
            <th scope="col" className="px-4 py-2 text-right font-medium md:px-6">
              Platz
            </th>
            <th scope="col" className="px-4 text-left font-medium md:px-6">
              Name
            </th>
            {championship.completed && (
              <th scope="col" className="px-4 text-center font-medium md:px-6 ">
                <span className="hidden sm:inline">Zusatzpunkte</span>
                <span className="sm:hidden">Zusatzpkt</span>
              </th>
            )}
            <th scope="col" className="px-4 text-center font-medium md:px-6">
              <span className="hidden sm:inline">
                {championship.completed ? 'Gesamtpunkte' : 'Punkte'}
              </span>
              <span className="sm:hidden">{championship.completed ? 'Gesamt' : 'Punkte'}</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line font-semibold text-subtle-foreground">
          {players.map((p, ix) => {
            const currentRank =
              ix === 0 ? '1.' : p.rank !== players[ix - 1].rank ? `${p.rank}.` : '';
            return (
              <tr key={p.id}>
                <td className="px-4 text-right md:px-6">{currentRank}</td>
                <td className="w-full px-4 py-2.5 md:px-6">{p.account.name}</td>
                {championship.completed && (
                  <td className="px-4 text-center md:px-6">{p.extraPoints}</td>
                )}
                <td className="px-4 text-center md:px-6">{p.totalPoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
