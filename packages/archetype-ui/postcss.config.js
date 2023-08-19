import postCssNesting from "postcss-nesting";

export default {
  plugins: {
    "postcss-advanced-variables": {},
    "tailwindcss/nesting": postCssNesting,
    tailwindcss: {},
    "@createinc/archetype/scope": {},
    "@createinc/archetype/better-states": {},
    autoprefixer: {},
  },
};
