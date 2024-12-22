import { useLoaderData } from 'react-router';
import { useChampionship } from '#/utils/app/championship';
import { usePlayers } from '#/utils/app/players';
import type { playersLoader } from './_route.data';

export default function PlayersRoute() {
  const championship = useChampionship();
  const players = usePlayers(championship.id);

  const { playerId, tips } = useLoaderData<ReturnType<typeof playersLoader>>();

  return (
    <div>
      <h1>Spieler</h1>
    </div>
  );
}
