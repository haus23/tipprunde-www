import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeToggle } from './components/nav/theme-toggle';
import { ThemeProvider } from './utils/theme';

import './styles/tailwind.css';

const container = document.getElementById('root');
if (!container) throw Error('Missing root element!');

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <span className="text-2xl">runde.tips</span>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  </StrictMode>,
);
