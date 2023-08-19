import { type PluginCreator, type Rule } from "postcss";
import selectorParser, { type ProcessorFn } from "postcss-selector-parser";

const DISABLED_SELECTOR = '[disabled],[aria-disabled="true"],[data-disabled]';
const PSEUDO_CLASSES = {
  "is-disabled": `:is(${DISABLED_SELECTOR})`,
  "is-focus-visible": `:is(:focus-visible,[data-focus-visible]):not(${DISABLED_SELECTOR})`,
  "is-targeted": `:is(:hover,:focus-visible,[data-focus-visible]):not(${DISABLED_SELECTOR})`,
  // this pressed selector is closer to native software behavior than just ":active"
  "is-pressed": `:is(:active:hover,[data-active]):not(${DISABLED_SELECTOR})`,
};

function replacePseudoStates(selector: string) {
  const transform: ProcessorFn = (rootNode) => {
    rootNode.walkPseudos((pseudo) => {
      const { value } = pseudo;

      const replacement =
        PSEUDO_CLASSES[value.substring(1) as keyof typeof PSEUDO_CLASSES];
      if (!replacement) return;

      const replacementNode = selectorParser().astSync(replacement);
      pseudo.replaceWith(replacementNode);
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

const createPlugin: PluginCreator<never> = () => ({
  postcssPlugin: "better-states",
  Rule(rule) {
    if (isProcessed(rule)) return;
    const newSelectors = rule.selectors.map(replacePseudoStates);
    rule.selectors = newSelectors;
    markProcessed(rule);
  },
});
createPlugin.postcss = true;

export default createPlugin;
