/**
 * This file contains utilities regarding the color theme. I am using a context to make
 * the client rerender a switched theme. In the epic stack we need to reload the site.
 */

import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from 'react';

const themes = ['dark', 'light'] as const;
type Theme = (typeof themes)[number];

type ThemeContextType = { theme: Theme; setTheme: Dispatch<SetStateAction<Theme>> };

const ThemeContext = createContext<ThemeContextType>(undefined as never);

type ThemeProviderProps = {
  children: ReactNode;
  requestedTheme: Theme;
};

function ThemeProvider({ children, requestedTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(requestedTheme);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { useTheme, ThemeProvider };
