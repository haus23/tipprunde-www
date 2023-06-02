import { Link, NavLink, useParams } from '@remix-run/react';
import * as Nav from '@radix-ui/react-navigation-menu';

import { Logo } from './logo';
import { ChampionshipSelect } from './championship-select';

const navItems = [
  { label: 'Tabelle', viewSegment: '', end: true },
  { label: 'Spieler', viewSegment: 'spieler', end: false },
  { label: 'Spiele', viewSegment: 'spiel', end: false },
];

export function NavDesktop() {
  const { championship: championshipId } = useParams();

  return (
    <div className="hidden items-center justify-between sm:flex">
      <Nav.Root>
        <Nav.List className="flex h-20 items-stretch">
          <Nav.Item className="flex items-stretch">
            <Nav.Link asChild>
              <Link to="/" className="group flex items-center focus:outline-none">
                <div className="flex items-center gap-x-2 rounded-md p-2 pl-1 ring-offset-background group-hover:bg-neutral-hover group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
                  <Logo className="h-10" />
                  <h1 className="text-xl">runde.tips</h1>
                </div>
              </Link>
            </Nav.Link>
          </Nav.Item>
          {navItems.map((item, ix) => (
            <Nav.Item key={ix} className="flex items-stretch">
              <Nav.Link asChild>
                <NavLink
                  className="group mx-1 flex items-center border-b-2 border-transparent px-2 pt-1 hover:border-line-hover focus:outline-none aria-[current=page]:border-primary-line-hover"
                  to={`/${[championshipId, item.viewSegment].filter(Boolean).join('/')}`}
                  end={item.end}
                >
                  <span className="rounded-md p-2 ring-offset-background group-hover:bg-neutral-hover group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
                    {item.label}
                  </span>
                </NavLink>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav.List>
      </Nav.Root>
      <div>
        <ChampionshipSelect />
      </div>
    </div>
  );
}
