export type PluginOptions = { prefix?: string; layer?: string };
export type PluginOptionsWithDefaults = Required<PluginOptions>;

export const DEFAULT_OPTIONS: PluginOptionsWithDefaults = {
  /** The prefix that will be used to scope class names. */
  prefix: "at",

  /** The name of the layer in which scoped stylesheets will be declared. */
  layer: "archetype",
};
