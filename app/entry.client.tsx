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
import { playersLoader } from './routes/players/_route.data';
import TablesRoute from './routes/tables/_route';
import { tablesLoader } from './routes/tables/_route.data';

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
    loader: layoutLoader(queryClient),
    element: <Layout />,
    id: 'master',
    hydrateFallbackElement: <Logo className="translate-y-[180px]" />,
    children: [
      {
        index: true,
        loader: tablesLoader(queryClient),
        element: <TablesRoute />,
        handle: { viewPath: '' },
      },
      {
        path: 'spieler',
        loader: playersLoader(queryClient),
        element: <PlayersRoute />,
        handle: { viewPath: 'spieler' },
      },
      {
        path: 'spiele',
        element: <MatchesRoute />,
        handle: { viewPath: 'spiele' },
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
