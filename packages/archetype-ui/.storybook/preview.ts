import "@createinc/archetype/tailwind.css";

import type { Preview } from "@storybook/react";

import { withTokens } from "../src/tailwind-tokens";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      exclude: ["ref"],
    },
    backgrounds: { disable: true },
    themes: {
      default: "dark",
      list: [
        { name: "dark", class: "dark", color: "#09090b" },
        { name: "light", class: "light", color: "#fff" },
      ],
    },
  },
};

export default preview;

// load tailwind config
declare const tailwind: any;
tailwind.config = withTokens({
  content: [],
  corePlugins: { preflight: false },
});

// this is necessary because the Tailwind Play CDN injects the base layer
// (@tailwind base) directly, which breaks the Archetype layer system,
// so we need to move it into the reset layer (@layer reset) manually
// see - https://github.com/tailwindlabs/tailwindcss/discussions/11654
let retries = 0;
function fixTailwindCDN() {
  const styleEl = [...document.querySelectorAll("style")].find((el) =>
    el.innerText.startsWith(":root")
  );
  if (!styleEl) {
    console.warn(
      "Missing Tailwind Play CDN style element, retrying in 300ms..."
    );
    if (retries++ > 10)
      return console.error(
        "Failed to fix Tailwind's Play CDN after 10 retries!"
      );
    return setTimeout(fixTailwindCDN, 300);
  }

  let ignoreNext = false;
  function applyFix() {
    if (ignoreNext) {
      ignoreNext = false;
      return;
    }
    if (!styleEl) return;
    const { reset, rest } = styleEl.innerHTML.match(
      /^(?<reset>[\s\S]+?--tw-[\s\S]+?}\s*)(?<rest>$|\.[\s\S]+$)/
    )!.groups!;
    styleEl.innerHTML = `@layer reset {\n${reset}\n}\n${rest}`;
    ignoreNext = true;
  }

  const observer = new MutationObserver(applyFix);
  observer.observe(styleEl, { childList: true });
  applyFix();
  console.log("✅ Tailwind's Play CDN successfully hacked!");
  console.log("Debug:", styleEl);
}

fixTailwindCDN();
