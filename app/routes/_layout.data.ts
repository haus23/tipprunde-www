import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router';
import { championshipsQuery } from '#/backend/queries';

export const layoutLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { championshipId } = params;
    const championships = await queryClient.ensureQueryData(
      championshipsQuery(),
    );

    if (championshipId && !championships.find((c) => c.id === championshipId))
      throw new Response('Not Found', { status: 404 });

    return { championships };
  };
