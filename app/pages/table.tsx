import type { Context } from "hono";
import { css } from "hono/css";
import {
  type CurrentMatch,
  getChampionships,
  getCurrentTips,
  getPlayers,
  type Player,
} from "../data/unterbau.ts";
import { Header } from "../ui/header.tsx";

/** `/` shows the newest championship, `/:championship` a specific one. */
export async function tablePage(c: Context) {
  const championships = await getChampionships();
  const id = c.req.param("championship");
  const championship = id
    ? championships.find((ch) => ch.id === id)
    : championships[0];
  if (!championship) {
    return c.notFound();
  }

  const [players, currentTips] = await Promise.all([
    getPlayers(championship.id),
    getCurrentTips(championship.id),
  ]);

  return c.render(
    <>
      <Header championships={championships} current={championship} />
      <main class={mainStyles}>
        <h1>
          {championship.completed ? "Abschlusstabelle" : "Aktuelle Tabelle"}
        </h1>
        <table class={tableStyles}>
          <thead>
            <tr>
              <th class="num">Platz</th>
              <th>Name</th>
              <th class="num">Zusatzpunkte</th>
              <th class="num">Punkte</th>
              {currentTips.length > 0 && <th class="num">Tipps</th>}
            </tr>
          </thead>
          <tbody>
            {players.map((player, i) => (
              <tr>
                {/* Tied players share a rank; show it only once. */}
                <td class="num rank">
                  {player.rank !== players[i - 1]?.rank && `${player.rank}.`}
                </td>
                <td>{player.account.name}</td>
                <td class="num">{player.extraPoints || ""}</td>
                <td class="num total">{player.totalPoints}</td>
                {currentTips.length > 0 && (
                  <td class="num">
                    <CurrentTips player={player} matches={currentTips} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>,
    { title: `Tabelle · ${championship.name}` },
  );
}

interface CurrentTipsProps {
  player: Player;
  matches: CurrentMatch[];
}

/** A button that opens the player's tips for the latest matches (popover, no JS). */
function CurrentTips({ player, matches }: CurrentTipsProps) {
  const id = `tips-${player.id}`;
  const name = player.account.name;

  return (
    <>
      <button
        type="button"
        popovertarget={id}
        class={tipsButtonStyles}
        aria-label={`Aktuelle Tipps von ${name}`}
      >
        ⋯
      </button>
      <div id={id} popover="auto" class={tipsStyles}>
        <h2>Tipps von {name}</h2>
        <table>
          <thead>
            <tr>
              <th>Spiel</th>
              <th class="num">Ergebnis</th>
              <th class="num">Tipp</th>
              <th class="num">Punkte</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => {
              const tip = match.tips[player.id];
              return (
                <tr>
                  <td>
                    {match.hometeam} – {match.awayteam}
                  </td>
                  <td class="num">{match.result}</td>
                  <td class="num">
                    {tip?.tip}
                    {tip?.joker && <span title="Joker"> ★</span>}
                  </td>
                  <td class="num">{match.result && (tip?.points ?? 0)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="button" popovertarget={id} popovertargetaction="hide">
          Schließen
        </button>
      </div>
    </>
  );
}

const mainStyles = css`
  max-width: 56rem;
  margin-inline: auto;
  padding: 1.5rem 1rem 3rem;
  & h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const tableStyles = css`
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
  & > thead > tr > th {
    padding: 0.5rem 0.75rem;
    background: var(--color-accent);
    color: var(--color-on-accent);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-align: left;
    text-transform: uppercase;
  }
  & > tbody > tr > td {
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--color-border);
  }
  & > tbody > tr:hover {
    background: var(--color-surface-strong);
  }
  & .num {
    width: 1%;
    text-align: right;
    white-space: nowrap;
  }
  & .rank {
    color: var(--color-muted);
  }
  & .total {
    font-weight: 600;
  }
  @media (max-width: 40rem) {
    & > * > tr > * {
      padding-inline: 0.375rem;
    }
    & > * > tr > :nth-child(3) {
      display: none;
    }
  }
`;

const tipsButtonStyles = css`
  padding: 0 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background: none;
  color: var(--color-muted);
  cursor: pointer;
  &:hover {
    color: var(--color-accent);
    border-color: var(--color-accent);
  }
`;

const tipsStyles = css`
  width: min(32rem, calc(100% - 2rem));
  margin: auto;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-surface);
  color: inherit;
  text-align: left;
  &::backdrop {
    background: rgb(0 0 0 / 0.4);
  }
  & h2 {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }
  & table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  & th,
  & td {
    padding: 0.375rem 0.5rem;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
  }
  & th {
    color: var(--color-muted);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
  }
  & .num {
    text-align: right;
  }
  & button {
    padding: 0.375rem 1rem;
    border: 0;
    border-radius: 0.375rem;
    background: var(--color-accent);
    color: var(--color-on-accent);
    cursor: pointer;
  }
`;
