import { css } from "remix/component";
import { Logo } from "../ui/logo.tsx";
import { Document } from "./document.tsx";

export function HomePage() {
  return () => (
    <Document title="runde.tips">
      <main mix={pageStyles}>
        <div mix={heroStyles}>
          <div mix={logoBoxStyles}>
            <Logo />
          </div>
          <p mix={brandStyles}>runde.tips</p>
        </div>
      </main>
    </Document>
  );
}

// Fill the viewport and center the content on both axes.
const pageStyles = css({
  display: "grid",
  placeItems: "center",
  minHeight: "100dvh",
  padding: "1rem",
});

// Small screens: logo above brand. Wider screens: side by side.
const heroStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  "@media (min-width: 40rem)": {
    flexDirection: "row",
    gap: "0.75rem",
  },
});

// The logo fills its container, so the container sets its size.
const logoBoxStyles = css({
  width: "6rem",
  "@media (min-width: 40rem)": {
    width: "5rem",
  },
});

const brandStyles = css({
  fontSize: "clamp(2rem, 6vw, 3rem)",
  fontWeight: 500,
  letterSpacing: "-0.02em",
});
