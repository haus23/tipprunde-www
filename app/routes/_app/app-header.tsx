import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '~/components/atoms/button';
import { Logo } from './logo';

export function AppHeader() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-b-line bg-subtle px-2 shadow-md sm:h-20 sm:px-4">
      <div className="flex items-center gap-x-2">
        <Logo className="h-10" />
        <h1 className="text-xl font-semibold">runde.tips</h1>
      </div>
      <div className="flex gap-x-2">
        <Button variant="toolbar" className="space-x-2">
          <MagnifyingGlassIcon className="h-6" />
          <span className="hidden sm:block">Turnier</span>
        </Button>
      </div>
    </div>
  );
}
