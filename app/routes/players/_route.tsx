import { useLoaderData, useSearchParams } from 'react-router';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/(ui)/elements/select';
import { useChampionship } from '#/utils/app/championship';
import { useMatches } from '#/utils/app/matches';
import { usePlayers } from '#/utils/app/players';
import type { playersLoader } from './_route.data';

export default function PlayersRoute() {
  const [searchParams, setSearchParams] = useSearchParams();

  const championship = useChampionship();

  const { matches, teams, rounds } = useMatches(championship.id);
  const playedMatches = matches.filter((m) => m.result).length;

  const players = usePlayers(championship.id);
  const { playerId, tips } = useLoaderData<ReturnType<typeof playersLoader>>();
  const player = players.find((p) => p.id === playerId) || players[0];

  function handleSelect(id: string) {
    const accId = players.find((p) => p.id === id)?.account.id;
    setSearchParams({ ...searchParams, name: accId }, { viewTransition: true });
  }

  return (
    <div>
      <title>{`Tipps ${player.account.name} ${championship.name} - runde.tips`}</title>
      <header className="sticky top-0 z-10 mx-2 flex items-center gap-x-4 bg-background pb-2 pt-1 text-accent-foreground sm:mx-0 sm:gap-x-4">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden py-1 sm:block">{championship.name} -</span>
          <span className="py-1">Tipps von </span>
        </h2>
        <Select value={playerId} onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {players.map((p) => (
              <SelectItem value={p.id} key={p.id}>
                {p.account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>
      <div className="mx-2 mt-6 max-w-3xl text-sm md:mx-auto">
        <div className="flex w-full justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Platz</p>
            <p className="brand-app-text-contrast text-center font-semibold">{`${player.rank}.`}</p>
          </div>
          <div className="space-y-1">
            <p className="px-4 text-xs font-medium uppercase">Spiele</p>
            <p className="brand-app-text-contrast text-center font-semibold">{`${playedMatches} (${matches.length})`}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Punkte</p>
            <p className="brand-app-text-contrast text-center font-semibold">
              {player.points}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase">Schnitt</p>
            <p className="brand-app-text-contrast text-center font-semibold">{`${
              playedMatches ? (player.points / playedMatches).toFixed(2) : ''
            }`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
