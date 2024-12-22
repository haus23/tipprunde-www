import { useLoaderData } from 'react-router';
import { useChampionship } from '#/utils/app/championship';
import { usePlayers } from '#/utils/app/players';
import type { playersLoader } from './_route.data';

export default function PlayersRoute() {
  const championship = useChampionship();
  const players = usePlayers(championship.id);

  const { playerId, tips } = useLoaderData<ReturnType<typeof playersLoader>>();

  const player = players.find((p) => p.id === playerId) || players[0];

  return (
    <div>
      <title>{`Tipps ${player.account.name} ${championship.name} - runde.tips`}</title>
      <h1>Spieler</h1>
    </div>
  );
}
