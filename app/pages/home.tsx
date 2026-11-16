import { css } from "hono/css";
import { Logo } from "../ui/logo.tsx";

export function HomePage() {
  return (
    <main class={pageStyles}>
      <div class={heroStyles}>
        <div class={logoBoxStyles}>
          <Logo />
        </div>
        <p class={brandStyles}>runde.tips</p>
      </div>
    </main>
  );
}

// Fill the viewport and center the content on both axes.
const pageStyles = css`
  display: grid;
  place-items: center;
  min-height: 100dvh;
  padding: 1rem;
`;

// Small screens: logo above brand. Wider screens: side by side.
const heroStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media (min-width: 40rem) {
    flex-direction: row;
    gap: 0.75rem;
  }
`;

// The logo fills its container, so the container sets its size.
const logoBoxStyles = css`
  width: 6rem;
  @media (min-width: 40rem) {
    width: 5rem;
  }
`;

const brandStyles = css`
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.02em;
`;
