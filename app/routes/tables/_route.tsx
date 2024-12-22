import { useChampionship } from '#/utils/app/championship';

export default function TablesRoute() {
  const championship = useChampionship();
  return (
    <div>
      <header className="mx-2 flex items-center gap-x-2 pt-2 text-accent-foreground sm:mx-0 sm:gap-x-4">
        <title>{`Tabelle ${championship.name} - runde.tips`}</title>
        <h1 className="flex gap-x-2 text-xl font-semibold tracking-tight">
          <span className="hidden sm:block">{championship.name} -</span>
          <span>
            {championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}
          </span>
        </h1>
      </header>
    </div>
  );
}
