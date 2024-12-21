import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './styles/tailwind.css';

const container = document.getElementById('root');
if (!container) throw Error('Missing root element!');

createRoot(container).render(
  <StrictMode>
    <span className="text-2xl">runde.tips</span>
  </StrictMode>,
);
