import type { Championship } from '@haus23/tipprunde-types';
import type { Params } from 'react-router';

export function getCurrentChampionship(
  championships: Championship[],
  params: Params,
) {
  const { championshipId } = params;

  const championship = championships.find((c) => c.id === championshipId);

  if (championshipId && !championship)
    throw new Response('Not Found', { status: 404 });

  return championship ?? championships[0];
}
