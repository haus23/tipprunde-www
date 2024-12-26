import type { QueryClient } from '@tanstack/react-query';

import { championshipsQuery } from '#/backend/queries';

export const rootLoader = (queryClient: QueryClient) => async () => {
  const championships = await queryClient.ensureQueryData(championshipsQuery());

  return { championships };
};
