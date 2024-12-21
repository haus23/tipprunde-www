import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import { ThemeProvider } from './utils/theme';

import Layout from './routes/_layout';
import MatchesRoute from './routes/matches/_route';
import PlayersRoute from './routes/players/_route';
import TablesRoute from './routes/tables/_route';

import './styles/tailwind.css';

const container = document.getElementById('root');
if (!container) throw Error('Missing root element!');

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path=":championshipId?" element={<Layout />}>
            <Route index element={<TablesRoute />} />
            <Route path="spieler" element={<PlayersRoute />} />
            <Route path="spiele" element={<MatchesRoute />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
