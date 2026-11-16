import { css } from "hono/css";
import type { Championship } from "../data/unterbau.ts";
import { Logo } from "./logo.tsx";

export interface HeaderProps {
  championships: Championship[];
  current: Championship;
}

/** Site header: brand, navigation, and the championship switcher (a popover). */
export function Header({ championships, current }: HeaderProps) {
  return (
    <header class={headerStyles}>
      <div class={barStyles}>
        <a href="/" class={brandStyles} aria-label="runde.tips">
          <span class={logoBoxStyles}>
            <Logo />
          </span>
          {/* Phones show only the logo, to leave room for the switcher. */}
          <span class={brandTextStyles}>runde.tips</span>
        </a>
        <nav class={navStyles}>
          <a href={`/${current.id}`} aria-current="page">
            Tabelle
          </a>
        </nav>
        <button
          type="button"
          popovertarget="championships"
          class={switcherStyles}
          aria-label={`Turnier: ${current.name}, wechseln`}
        >
          {current.name} <span aria-hidden="true">▾</span>
        </button>
        <div id="championships" popover="auto" class={menuStyles}>
          <ul>
            {championships.map((c) => (
              <li>
                <a
                  href={`/${c.id}`}
                  aria-current={c.id === current.id ? "page" : undefined}
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

const headerStyles = css`
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
`;

const barStyles = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 56rem;
  margin-inline: auto;
  padding: 0.75rem 1rem;
  @media (min-width: 30rem) {
    gap: 1.5rem;
  }
`;

const brandTextStyles = css`
  @media (max-width: 30rem) {
    display: none;
  }
`;

const brandStyles = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
`;

const logoBoxStyles = css`
  width: 1.75rem;
`;

const navStyles = css`
  display: flex;
  gap: 1rem;
  & a {
    color: var(--color-muted);
    text-decoration: none;
    padding-block: 0.25rem;
    border-bottom: 2px solid transparent;
  }
  & a[aria-current="page"] {
    color: var(--color-fg);
    border-color: var(--color-accent);
  }
`;

const switcherStyles = css`
  margin-left: auto;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background: none;
  color: inherit;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: var(--color-surface-strong);
  }
`;

const menuStyles = css`
  position: fixed;
  inset: 3.5rem 1rem auto auto;
  margin: 0;
  max-height: 70dvh;
  overflow: auto;
  padding: 0.25rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background: var(--color-surface);
  color: inherit;
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.2);
  & ul {
    list-style: none;
    padding: 0;
  }
  & a {
    display: block;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    color: inherit;
    text-decoration: none;
  }
  & a:hover {
    background: var(--color-surface-strong);
  }
  & a[aria-current="page"] {
    color: var(--color-accent);
    font-weight: 600;
  }
`;
