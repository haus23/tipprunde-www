import { NavLink, Outlet } from 'react-router';

export default function Layout() {
  return (
    <div>
      <header>
        <span>runde.tips</span>
        <nav>
          <NavLink to="/">Tabelle</NavLink>
          <NavLink to="/spieler">Spieler</NavLink>
          <NavLink to="/spiele">Spiele</NavLink>
        </nav>
      </header>
      <main className="mx-auto mt-4 max-w-5xl pb-10 sm:mt-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
