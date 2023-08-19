import { createArchetypeTokens } from "@createinc/archetype";

export const typography = createArchetypeTokens("typography", {
  fonts: {
    DEFAULT: "'Inter', sans-serif",
  },
  types: {
    h1: {
      weight: 600,
      size: "2.5rem",
      lineHeight: 1.2,
    },
    h2: {
      weight: 600,
      size: "2rem",
      lineHeight: 1.2,
    },
    h3: {
      weight: 600,
      size: "1.5rem",
      lineHeight: 1.2,
    },
    h4: {
      weight: 600,
      size: "1.25rem",
      lineHeight: 1.2,
    },
    h5: {
      weight: 600,
      size: "1rem",
      lineHeight: 1.2,
    },
    h6: {
      weight: 600,
      size: ".875rem",
      lineHeight: 1.2,
    },
    bodyLg: {
      weight: 400,
      size: "1rem",
      lineHeight: 1.5,
      weightVariants: {
        heavy: 600,
      },
    },
    bodyMd: {
      weight: 400,
      size: ".875rem",
      lineHeight: 1.5,
      weightVariants: {
        heavy: 600,
      },
    },
    bodySm: {
      weight: 400,
      size: ".75rem",
      lineHeight: 1.5,
      weightVariants: {
        heavy: 600,
      },
    },
  },
});
