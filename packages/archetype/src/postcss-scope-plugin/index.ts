import { type PluginCreator } from "postcss";

import {
  DEFAULT_OPTIONS,
  type PluginOptions,
  type PluginOptionsWithDefaults,
} from "./options";
import { applyScope } from "./utils/apply-scope";

const createPlugin: PluginCreator<PluginOptions | undefined> = (options) => {
  const optionsWithDefaults: PluginOptionsWithDefaults = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  return {
    postcssPlugin: "archetype-scope",
    Root(rootNode) {
      applyScope(rootNode, optionsWithDefaults);
    },
  };
};
createPlugin.postcss = true;

export default createPlugin;
