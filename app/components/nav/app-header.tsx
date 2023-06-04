import { NavDesktop } from './nav-desktop';
import { NavMobile } from './nav-mobile';

export function AppHeader() {
  return (
    <div className="h-16 border-b border-b-line bg-subtle px-2 font-medium shadow-md sm:h-20 sm:px-4">
      <NavDesktop />
      <NavMobile />
    </div>
  );
}
