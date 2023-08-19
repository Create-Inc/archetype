import { createArchetypeTokens } from "@createinc/archetype";

export const colors = createArchetypeTokens("colors", {
  border: {
    LIGHT: "hsl(214.3 31.8% 91.4%)",
    DARK: "hsl(216 34% 17%)",
  },
  input: {
    LIGHT: "hsl(214.3 31.8% 91.4%)",
    DARK: "hsl(216 34% 17%)",
  },
  ring: {
    LIGHT: "hsl(215 20.2% 65.1%)",
    DARK: "hsl(216 34% 17%)",
  },
  background: {
    LIGHT: "hsl(0 0% 100%)",
    DARK: "hsl(224 71% 4%)",
  },
  foreground: {
    LIGHT: "hsl(222.2 47.4% 11.2%)",
    DARK: "hsl(213 31% 91%)",
  },
  primary: {
    LIGHT: "hsl(222.2 47.4% 11.2%)",
    DARK: "hsl(210 40% 98%)",
    foreground: {
      LIGHT: "hsl(210 40% 98%)",
      DARK: "hsl(222.2 47.4% 1.2%)",
    },
  },
  secondary: {
    LIGHT: "hsl(210 40% 96.1%)",
    DARK: "hsl(222.2 47.4% 11.2%)",
    foreground: {
      LIGHT: "hsl(222.2 47.4% 11.2%)",
      DARK: "hsl(210 40% 98%)",
    },
  },
  destructive: {
    LIGHT: "hsl(0 100% 50%)",
    DARK: "hsl(0 63% 31%)",
    foreground: {
      LIGHT: "hsl(210 40% 98%)",
      DARK: "hsl(210 40% 98%)",
    },
  },
  muted: {
    LIGHT: "hsl(210 40% 96.1%)",
    DARK: "hsl(223 47% 11%)",
    foreground: {
      LIGHT: "hsl(215.4 16.3% 46.9%)",
      DARK: "hsl(215.4 16.3% 56.9%)",
    },
  },
  accent: {
    LIGHT: "hsl(210 40% 96.1%)",
    DARK: "hsl(216 34% 17%)",
    foreground: {
      LIGHT: "hsl(222.2 47.4% 11.2%)",
      DARK: "hsl(210 40% 98%)",
    },
  },
  popover: {
    LIGHT: "hsl(0 0% 100%)",
    DARK: "hsl(224 71% 4%)",
    foreground: {
      LIGHT: "hsl(222.2 47.4% 11.2%)",
      DARK: "hsl(215 20.2% 65.1%)",
    },
  },
  card: {
    LIGHT: "hsl(0 0% 100%)",
    DARK: "hsl(224 71% 4%)",
    foreground: {
      LIGHT: "hsl(222.2 47.4% 11.2%)",
      DARK: "hsl(213 31% 91%)",
    },
  },

  // TODO: probably wise to remove these and
  // replace with Tailwind's built-in colors

  // aliases
  danger: "alias:red",
  warning: "alias:yellow",
  success: "alias:green",

  // raw
  white: "#ffffff",
  black: "#000000",
  transparent: "#ffffff00",
  gray: {
    50: "#E5E5E5",
    100: "#CCCCCC",
    200: "#B2B2B2 ",
    300: "#999999",
    400: "#7F7F7F",
    500: "#666666",
    600: "#4C4C4C",
    700: "#323232",
    800: "#0F0F0F",
    900: "#0A0A0A",
  },
  blue: {
    50: "#E7F5FF",
    100: "#D0EBFF",
    200: "#A5D8FF",
    300: "#74C0FC",
    400: "#4DABF7",
    500: "#339AF0",
    600: "#228BE6",
    700: "#1C7ED6",
    800: "#1971C2",
    900: "#1864AB",
  },
  pink: {
    50: "#FCE6FA",
    100: "#F2C3FA",
    200: "#E596F2",
    300: "#CC63E6",
    400: "#CC38D9",
    500: "#C920AE",
    600: "#B81276",
    700: "#A60C56",
    800: "#92096C",
    900: "#7F084F",
  },
  purple: {
    50: "#F2E6FC",
    100: "#D5C3FA",
    200: "#C496F2",
    300: "#9D63E6",
    400: "#9238D9",
    500: "#7F20C9",
    600: "#6F12B8",
    700: "#590CA6",
    800: "#560992",
    900: "#44087F",
  },
  green: {
    50: "#E6FCF5",
    100: "#C3FAE8",
    200: "#96F2D7",
    300: "#63E6BE",
    400: "#38D9A9",
    500: "#20C997",
    600: "#12B886",
    700: "#0CA678",
    800: "#099268",
    900: "#087F5B",
  },
  yellow: {
    50: "#FFF9DB",
    100: "#FFF3BF",
    200: "#FFEC99",
    300: "#FFE066",
    400: "#FFD43B",
    500: "#FCC419",
    600: "#F59F00",
    700: "#F59F00",
    800: "#F08C00",
    900: "#E67700",
  },
  red: {
    50: "#FFF5F5",
    100: "#FFE3E3",
    200: "#FFC9C9",
    300: "#FFA8A8",
    400: "#FF8787",
    500: "#FF6B6B",
    600: "#FA5252",
    700: "#F03E3E",
    800: "#E03131",
    900: "#C92A2A",
  },
});
