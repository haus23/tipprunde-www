import { json, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';

import { fetchChampionshipPlayers } from '~/backend/queries';
import { Select } from '~/components/elements/select';
import { getChampionship } from '~/utils/route-match-helper';
import { useChampionship } from '~/utils/use-championship';

export const meta: V2_MetaFunction = ({ matches, params }) => {
  const championship = getChampionship(params.championship, matches);
  return [{ title: `Tipps ${championship.name} - runde.tips` }];
};

export const loader = async ({ params }: LoaderArgs) => {
  return json(await fetchChampionshipPlayers(params.championship));
};

export default function Spieler() {
  const championship = useChampionship();
  const players = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const accId = searchParams.get('name');
  const player = players.find((p) => p.account.id === accId) || players[0];

  function handleSelect(value: string) {
    const accId = players.find((p) => p.id === value)?.account.id;
    setSearchParams({ ...searchParams, name: accId });
  }

  return (
    <>
      <header className="mx-2 flex items-center gap-x-4 text-accent-foreground sm:mx-0 sm:gap-x-4">
        <h2 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden py-1 sm:block">{championship.name} -</span>
          <span className="py-1">Tipps von </span>
        </h2>
        <Select
          value={player.id}
          onValueChanged={handleSelect}
          options={players}
          display={(p) => p.account.name}
        />
      </header>
    </>
  );
}
