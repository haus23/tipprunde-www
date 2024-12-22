import * as Nav from '@radix-ui/react-navigation-menu';

import { Link, NavLink } from '../(ui)/atoms/link';
import { Logo } from '../brand/logo';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { label: 'Tabelle', viewSegment: '', end: true },
  { label: 'Spieler', viewSegment: 'spieler', end: false },
  { label: 'Spiele', viewSegment: 'spiele', end: false },
];

export function NavDesktop() {
  return (
    <div className="hidden items-center justify-between sm:flex">
      <Nav.Root>
        <Nav.List className="flex h-20 items-stretch gap-x-4">
          <Nav.Item className="flex items-center">
            <Link to="/" className="flex items-center gap-x-2 pl-1 pr-2">
              <Logo className="h-12 w-12" />
              <span className="text-xl">runde.tips</span>
            </Link>
          </Nav.Item>
          {navItems.map((item) => (
            <Nav.Item key={item.label} className="flex items-center">
              <NavLink to={`/${item.viewSegment}`} end={item.end}>
                {item.label}
              </NavLink>
            </Nav.Item>
          ))}
        </Nav.List>
      </Nav.Root>
      <div className="flex gap-x-2">
        <ThemeToggle />
      </div>
    </div>
  );
}
