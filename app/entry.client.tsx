import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';

import { Logo } from './components/brand/logo';
import { ThemeProvider } from './utils/theme';

import Layout from './routes/_layout';
import { layoutLoader } from './routes/_layout.data';
import MatchesRoute from './routes/matches/_route';
import PlayersRoute from './routes/players/_route';
import TablesRoute from './routes/tables/_route';

import './styles/tailwind.css';

const container = document.getElementById('root');
if (!container) throw Error('Missing root element!');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

const router = createBrowserRouter([
  {
    path: ':championshipId?',
    element: <Layout />,
    loader: layoutLoader(queryClient),
    hydrateFallbackElement: <Logo className="translate-y-[180px]" />,
    children: [
      {
        index: true,
        element: <TablesRoute />,
      },
      {
        path: 'spieler',
        element: <PlayersRoute />,
      },
      {
        path: 'spiele',
        element: <MatchesRoute />,
      },
    ],
  },
]);

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
