import { withArchetypeTailwind } from "@createinc/archetype";
// This is needed due to tailwindcss-animate not having types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import tailwindcssAnimate from "tailwindcss-animate";

import { tokens } from "./_tokens";

export const withTokens = withArchetypeTailwind({
  tokens,
  baseStyles: (theme) => ({
    "*": { borderColor: theme("colors.border") },
    body: {
      backgroundColor: theme("colors.background"),
      color: theme("colors.foreground"),
    },
  }),
  tailwindConfig: { plugins: [tailwindcssAnimate] },
});
