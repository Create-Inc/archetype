import { type Root, type Rule } from "postcss";
import selectorParser, { type ProcessorFn } from "postcss-selector-parser";

import { type PluginOptionsWithDefaults } from "../options";

function scopeClasses(selector: string, scope: string, prefix: string) {
  const transform: ProcessorFn = (rootNode) => {
    rootNode.walkClasses((classNode) => {
      const { value } = classNode;
      classNode.value = value.startsWith("_")
        ? `${value.substring(1)}` // global
        : `${prefix}_${scope}_${value}`; // scoped
    });
  };
  return selectorParser(transform).processSync(selector);
}

const PROCESSED = Symbol("processed");
function isProcessed(rule: Rule) {
  // @ts-expect-error It's fine, but types do not allow it.
  return Boolean(rule[PROCESSED]);
}
function markProcessed(rule: Rule) {
  // @ts-expect-error It's fine, but types do not allow it.
  rule[PROCESSED] = true;
}

export function applyClassScoping(
  rootNode: Root,
  scope: string,
  { prefix }: PluginOptionsWithDefaults
) {
  rootNode.walkRules((rule) => {
    if (isProcessed(rule)) return;
    const newSelectors = rule.selectors.map((selector) =>
      scopeClasses(selector, scope, prefix)
    );
    rule.selectors = newSelectors;
    markProcessed(rule);
  });
}
