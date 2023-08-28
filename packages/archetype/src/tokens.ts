/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any */
import { cloneDeep, kebabCase, mergeWith } from "lodash";
import { type CSSProperties } from "react";
import { type Config as TailwindConfig } from "tailwindcss";
import tailwindPlugin from "tailwindcss/plugin";
import { type PluginAPI } from "tailwindcss/types/config";
import { type F } from "ts-toolbelt";

// token types
// -----------

// eslint-disable-next-line @typescript-eslint/ban-types
type NoFunctionProperties<T> = { [K in keyof T]: Exclude<T[K], Function> };
type TailwindTheme = NoFunctionProperties<
  Required<NonNullable<TailwindConfig["theme"]>>
>;
type CSS = Required<CSSProperties>;

export type ArchetypeColors = TailwindTheme["colors"];
export type ArchetypeTextColors = ArchetypeColors;
export type ArchetypeScreens = TailwindTheme["screens"];
export type ArchetypeShadows = TailwindTheme["boxShadow"];
export type ArchetypeTypography<Font extends string> = {
  fonts: { DEFAULT: CSS["fontFamily"] } & {
    [K in Font]: CSS["fontFamily"];
  };
  types: {
    [K in string]: {
      weight: CSS["fontWeight"];
      size: CSS["fontSize"];
      lineHeight: CSS["lineHeight"];
      font?: F.NoInfer<Font>;
      letterSpacing?: CSS["letterSpacing"];
      textTransform?: CSS["textTransform"];
      weightVariants?: {
        [J in string]: CSS["fontWeight"];
      };
    };
  };
};

export type ArchetypeTokens<Font extends string> = {
  colors?: ArchetypeColors;
  textColors?: ArchetypeTextColors;
  screens?: ArchetypeScreens;
  shadows?: ArchetypeShadows;
  typography?: ArchetypeTypography<Font>;
  // TODO: focus ring
  // TODO: grid
};

// token creators
// --------------

type TokensByType<
  Type extends keyof ArchetypeTokens<string> | "all" = "all",
  Font extends string = string
> = Type extends "typography"
  ? ArchetypeTypography<Font>
  : Type extends keyof ArchetypeTokens<Font>
  ? ArchetypeTokens<Font>[Type]
  : ArchetypeTokens<Font>;

export function createArchetypeTokens<
  Type extends keyof ArchetypeTokens<string> | "all" = "all",
  Font extends string = string
  // @ts-expect-error This argument is only used to infer the type argument.
>(type: Type, tokens: TokensByType<Type, Font>) {
  return tokens;
}

// extend archetype tokens
// -----------------------

export function extendArchetypeTokens<
  BaseFont extends string,
  Font extends string
>(
  baseTokens: ArchetypeTokens<BaseFont>,
  tokens: ArchetypeTokens<Font>
): ArchetypeTokens<BaseFont | Font> {
  return mergeWith({}, baseTokens, tokens);
}

// colors
// ------

function getColorByPath(path: string, colors: ArchetypeColors) {
  const pathParts = path.split(".");
  let node = colors;
  for (const part of pathParts) {
    const subNode = node[part];
    if (subNode == null) throw new Error(`Color path not found: ${path}`);
    if (typeof subNode === "string") return subNode;
    node = subNode;
  }
  return node;
}

function walkColors(
  node: ArchetypeColors,
  fn: (
    key: string,
    value: ArchetypeColors | string,
    parent: ArchetypeColors,
    colors: ArchetypeColors,
    path: string
  ) => void,
  colors: ArchetypeColors = node,
  path = ""
) {
  Object.entries(node).forEach(([key, value]) => {
    const currentPath = `${path}${path.length > 0 ? "." : ""}${key}`;
    if (typeof value !== "string") walkColors(value, fn, colors, currentPath);
    fn(key, value, node, colors, currentPath);
  });
}

type ThemedColors = Record<string, { light: string; dark: string }>;

function isHsl(color: string) {
  return color.startsWith("hsl(") && color.endsWith(")");
}

function trimHsl(color: string) {
  return color.slice(4, -1);
}

function resolveColors(colors: ArchetypeColors) {
  const colorsCopy = cloneDeep(colors);
  const themedColors: ThemedColors = {};

  // resolve aliases
  walkColors(colorsCopy, (key, value, parent, colorsToWalk) => {
    if (typeof value === "string" && value.startsWith("alias:")) {
      const path = value.slice(6);
      parent[key] = getColorByPath(path, colorsToWalk);
    }
  });

  // format names
  walkColors(colorsCopy, (key, value, parent) => {
    if (["DEFAULT", "LIGHT", "DARK"].includes(key)) return;
    const formattedKey = kebabCase(key);
    if (formattedKey !== key) {
      delete parent[key];
      parent[formattedKey] = value;
    }
  });

  // handle light/dark variants
  walkColors(colorsCopy, (key, value, parent, _, path) => {
    if (typeof value === "string") return;
    const keys = Object.keys(value);
    if (!keys.some((k) => ["LIGHT", "DARK"].includes(k))) return;
    if (keys.includes("DEFAULT"))
      throw new Error("Cannot have DEFAULT and LIGHT/DARK");
    if (!(keys.includes("LIGHT") && keys.includes("DARK")))
      throw new Error("Must have LIGHT and DARK");

    const { LIGHT: light, DARK: dark } = value;
    if (typeof light !== "string" || typeof dark !== "string")
      throw new Error("LIGHT and DARK must be strings");

    delete value.LIGHT;
    delete value.DARK;

    const varName = `--at-color-${kebabCase(path)}`;
    let themedValue = `var(${varName})`;
    if (isHsl(light) && isHsl(dark)) themedValue = `hsl(var(${varName}))`;

    themedColors[kebabCase(path)] = { light, dark };

    if (keys.some((k) => !["LIGHT", "DARK"].includes(k)))
      value.DEFAULT = themedValue;
    else parent[key] = themedValue;
  });

  return [colorsCopy, themedColors] as const;
}

function createThemedColorsPlugin(themedColors: ThemedColors) {
  const rootVars: Record<string, string> = {};
  const darkVars: Record<string, string> = {};
  Object.entries(themedColors).forEach(([key, { light, dark }]) => {
    const name = `--at-color-${key}`;
    rootVars[name] = light;
    darkVars[name] = dark;
    if (isHsl(light) && isHsl(dark)) {
      rootVars[name] = trimHsl(light);
      darkVars[name] = trimHsl(dark);
    }
  });
  return tailwindPlugin(({ addBase }) => {
    addBase({ ":root": rootVars, ".dark": darkVars });
  });
}

// typography
// ----------

function createTypographyPlugin<Font extends string>(
  typography: ArchetypeTypography<Font>
) {
  function varName(name: string) {
    return `--at-${name}`;
  }

  function fontName(name: string) {
    return `${name === "DEFAULT" ? "-default" : `-${kebabCase(name)}`}`;
  }

  function fontVarName(name: string) {
    return varName(`font-family${fontName(name)}`);
  }

  function typeName(name: string) {
    let kebabName = kebabCase(name);

    // convert "h-1" -> "h1"
    const letterNumberRegExp = /^(?<letter>[a-z])-(?<number>[0-9])$/;
    if (letterNumberRegExp.test(kebabName))
      kebabName = kebabName.replace("-", "");

    return kebabName;
  }

  const cssVariables: Record<string, string> = {};
  const components: Record<string, Record<string, string>> = {};
  const utilities: Record<string, Record<string, string>> = {};

  // fonts
  Object.entries(typography.fonts).forEach(([name, value]) => {
    cssVariables[fontVarName(name)] = String(value);
    utilities[`.font${fontName(name)}`] = {
      fontFamily: `var(${fontVarName(name)})`,
    };
  });

  function createTypeValue(
    name: string,
    {
      weight,
      size,
      lineHeight,
      font,
      letterSpacing,
      textTransform,
    }: NonNullable<ArchetypeTypography<Font>["types"][string]>,
    variant?: string
  ) {
    const component: Record<string, string> = {};

    function addProperty(prop: string, value: string, targetName = name) {
      const propVarName = varName(`${typeName(targetName)}-${prop}`);
      cssVariables[propVarName] = value;
      component[prop] = `var(${propVarName})`;
    }

    addProperty(
      "font",
      `${weight} ${size}/${lineHeight} var(${fontVarName(font ?? "DEFAULT")})`,
      variant ? `${name}-${variant}` : name
    );

    if (letterSpacing) addProperty("letter-spacing", String(letterSpacing));
    if (textTransform) addProperty("text-transform", textTransform);

    return component;
  }

  // types
  Object.entries(typography.types).forEach(
    ([name, { weightVariants, ...type }]) => {
      components[`.text-${typeName(name)}`] = createTypeValue(name, type);

      if (weightVariants) {
        Object.entries(weightVariants).forEach(([variant, weight]) => {
          components[`.text-${typeName(`${name}-${variant}`)}`] =
            createTypeValue(name, { ...type, weight }, variant);
        });
      }
    }
  );

  // plugin
  return tailwindPlugin(({ addComponents, addUtilities, addBase }) => {
    addBase({ ":root": cssVariables });
    addComponents(components);
    addUtilities(utilities);
  });
}

// tokens to tailwind config
// -------------------------

export function archetypeTokensToTailwindConfig<Font extends string>({
  colors,
  textColors,
  screens,
  shadows,
  typography,
}: ArchetypeTokens<Font>): Partial<TailwindConfig> {
  const config: Partial<TailwindConfig> = { theme: {}, plugins: [] };
  const theme = config.theme!;
  const plugins = config.plugins!;

  let themedColors: ThemedColors = {};

  const colorsWithCurrent = { ...colors, current: "currentColor" };

  if (colors) {
    const [values, themedValues] = resolveColors(colorsWithCurrent);
    theme.colors = values;
    themedColors = { ...themedColors, ...themedValues };
  }
  if (textColors) {
    const [values, themedValues] = resolveColors({
      ...colorsWithCurrent,
      ...textColors,
    });
    theme.textColor = values;
    themedColors = { ...themedColors, ...themedValues };
  }
  if (Object.keys(themedColors).length > 0)
    plugins.push(createThemedColorsPlugin(themedColors));
  if (screens) theme.screens = screens;
  if (shadows) theme.boxShadow = shadows;

  if (typography) {
    plugins.push(createTypographyPlugin(typography));
    // unset default values
    theme.fontWeight = {};
    theme.fontSize = {};
    theme.lineHeight = {};
    theme.fontFamily = {};
    theme.letterSpacing = {};
  }

  return config;
}

// with archetype tailwind
// -----------------------

function concatArrays(value: any, srcValue: any) {
  if (Array.isArray(value) && Array.isArray(srcValue))
    return [...value, ...srcValue];
  return undefined;
}

function mergeTailwindConfigs(...sources: Partial<TailwindConfig>[]) {
  return mergeWith({}, ...sources, concatArrays);
}

type BaseStyles = Parameters<PluginAPI["addBase"]>[0];
type Theme = PluginAPI["theme"];

export type ArchetypeTailwindOptions<Font extends string> = {
  tokens: ArchetypeTokens<Font>;
  baseStyles?: BaseStyles | ((theme: Theme) => BaseStyles);
  tailwindConfig?: Partial<TailwindConfig>;
};

function createBaseStylesTailwindConfig(
  baseStyles?: BaseStyles | ((theme: Theme) => BaseStyles)
): Partial<TailwindConfig> {
  if (!baseStyles) return {};
  return {
    plugins: [
      tailwindPlugin(({ addBase, theme }) =>
        addBase(
          typeof baseStyles === "function" ? baseStyles(theme) : baseStyles
        )
      ),
    ],
  };
}

export function withArchetypeTailwind<Font extends string>({
  tokens,
  tailwindConfig = {},
  baseStyles,
}: ArchetypeTailwindOptions<Font>): (config: TailwindConfig) => TailwindConfig {
  const tokensTailwindConfig = archetypeTokensToTailwindConfig(tokens);
  const baseStylesTailwindConfig = createBaseStylesTailwindConfig(baseStyles);
  return (config) =>
    mergeTailwindConfigs(
      tokensTailwindConfig,
      baseStylesTailwindConfig,
      tailwindConfig,
      config
    );
}
