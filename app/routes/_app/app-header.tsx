import { Logo } from './logo';
import { ChampionshipSelect } from './championship-select';

export function AppHeader() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-b-line bg-subtle px-2 shadow-md sm:h-20 sm:px-4">
      <div className="flex items-center gap-x-2">
        <Logo className="h-10" />
        <h1 className="text-xl font-semibold">runde.tips</h1>
      </div>
      <div className="flex gap-x-2">
        <ChampionshipSelect />
      </div>
    </div>
  );
}
