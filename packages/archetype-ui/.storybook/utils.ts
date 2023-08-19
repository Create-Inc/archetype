import * as icons from "../src/icons";
import { action } from "@storybook/addon-actions";

/** Adds icon controls with selects to a story. */
export function withIconControls(
  story: any,
  props: string | string[],
  {
    defaults = {},
    required = false,
  }: { defaults?: Record<string, string>; required?: boolean } = {}
) {
  story.args ??= {};
  story.argTypes ??= {};

  (Array.isArray(props) ? props : [props]).forEach((prop) => {
    story.args![prop] = defaults[prop] ?? "(none)";
    story.argTypes![prop] = {
      options: required
        ? Object.keys(icons)
        : ["(none)", ...Object.keys(icons)],
      mapping: { "(none)": undefined, ...icons },
    };
  });
}

const FEATURES = ["actions", "controls", "interactions"] as const;
type Feature = (typeof FEATURES)[number];

// TODO: how to hide interactions?
// TODO: add "code" as option
/**
 * Adds features to a story in a whitelist fashion. To disabled all features,
 * pass `false`.
 */
export function withFeatures(
  story: any,
  features: Feature | Feature[] | false
) {
  story.parameters ??= {};

  const feats = Array.isArray(features) ? features : [features];

  FEATURES.forEach((feature) => {
    if (feats.includes(feature)) return;
    story.parameters![feature] = { disable: true };
  });
}

/**
 * Wraps a callback to register a Storybook action. Useful when a custom
 * callback is needed in a story for an event that is meant to be registered as
 * an action.
 */
export function withAction<T extends (...args: any[]) => any>(
  name: string,
  cb: T
) {
  const registerAction = action(name);
  return (...args: Parameters<T>) => {
    registerAction(...args);
    return cb(...args);
  };
}
