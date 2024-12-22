import { useChampionship } from '#/utils/app/championship';

export default function TablesRoute() {
  const championship = useChampionship();
  return (
    <div>
      <title>{`Tabelle ${championship.name} - runde.tips`}</title>
      <h1 className="flex gap-x-2 text-xl font-semibold tracking-tight">
        <span className="hidden sm:block">{championship.name} -</span>
        <span>
          {championship.completed ? 'Abschlusstabelle' : 'Aktuelle Tabelle'}
        </span>
      </h1>
    </div>
  );
}
