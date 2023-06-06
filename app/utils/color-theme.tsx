/**
 * This file contains utilities regarding the color theme. I am using a context to make
 * the client rerender a switched theme. In the epic stack you need to reload the site.
 */

import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, useCallback } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
} from 'react';
import { Button } from '~/components/(ui)/atoms/button';
import { cn } from '.';
import { useFetcher } from '@remix-run/react';

const themes = ['dark', 'light'] as const;
type Theme = (typeof themes)[number];

type ThemeContextType = { theme: Theme; setTheme: Dispatch<SetStateAction<Theme>> };

const ThemeContext = createContext<ThemeContextType>(undefined as never);

type ThemeProviderProps = {
  children: ReactNode;
  requestedTheme: Theme;
};

function ThemeProvider({ children, requestedTheme }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(requestedTheme);

  const persistTheme = useFetcher();

  const setTheme = useCallback(
    (cb: Parameters<typeof setThemeState>[0]) => {
      const newTheme = typeof cb === 'function' ? cb(theme) : cb;
      setThemeState(newTheme);
      persistTheme.submit({ theme: newTheme }, { action: 'resource/theme', method: 'post' });
    },
    [theme, persistTheme]
  );

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

type ThemeToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ onClick, className, ...props }, ref) => {
    const { theme, setTheme } = useTheme();

    function handleToggle(ev: MouseEvent<HTMLButtonElement>) {
      setTheme((theme === 'dark' && 'light') || 'dark');
      onClick && onClick(ev);
    }

    return (
      <Button
        ref={ref}
        onClick={handleToggle}
        variant="toolbar"
        aria-label="Hell-/Dunkel-Modus umschalten"
        className={cn('overflow-clip', className)}
      >
        <div className="relative h-6 w-6">
          <MoonIcon className="absolute inset-0 h-6 origin-[50%_100px] rotate-90 transform transition-transform duration-500 dark:rotate-0" />
          <SunIcon className="absolute inset-0 h-6 origin-[50%_100px] rotate-0 transform transition-transform duration-500 dark:-rotate-90" />
        </div>
      </Button>
    );
  }
);
ThemeToggle.displayName = 'ThemeToggle';

export { type Theme, ThemeProvider, ThemeToggle, useTheme };
