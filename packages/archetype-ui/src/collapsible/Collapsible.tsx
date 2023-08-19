import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type ExtendedProps,
} from "@createinc/archetype";

// collapsible
// -----------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useDisclosureStore,
  "Collapsible"
);

/**
 * `Collapsible` component.
 *
 * @example
 *
 * ```tsx
 * <Collapsible>
 *   <Collapsible.Trigger>
 *     <Button>Click me</Button>
 *   </Collapsible.Trigger>
 *   <Collapsible.Content>
 *     <div>Content</div>
 *   </Collapsible.Content>
 * </Collapsible>;
 * ```
 */
export const Collapsible: Component<CollapsibleProps, Properties> =
  createComponent(Root);

/** `Collapsible` options. */
export type CollapsibleOptions = {
  /** The Ariakit store. */
  store?: Ariakit.DisclosureStore;

  /** The children. */
  children?: React.ReactNode;
};

/** `Collapsible` props. */
export type CollapsibleProps = ExtendedProps<
  Ariakit.DisclosureStoreProps,
  CollapsibleOptions
>;

// Trigger
// -----

const Trigger: Component<CollapsibleTriggerProps> = createComponent((props) => (
  <Ariakit.Disclosure store={useStoreContext()} {...props} />
));

/** `Collapsible.Trigger` props. */
export type CollapsibleTriggerProps = ExtendedProps<Ariakit.DisclosureProps>;

Collapsible.Trigger = Trigger;
interface Properties {
  /**
   * The disclosure's trigger. Rendered as `<Ariakit.Disclosure />`.
   *
   * @example
   *
   * ```tsx
   * <Collapsible.Trigger>
   *   <Button>Click me</Button>
   * </Collapsible.Trigger>;
   * ```
   */
  Trigger: typeof Trigger;
}

// Content
// -------

const Content: Component<CollapsibleContentProps> = createComponent((props) => (
  <Ariakit.DisclosureContent store={useStoreContext()} {...props} />
));

/** `Collapsible.Content` props. */
export type CollapsibleContentProps =
  ExtendedProps<Ariakit.DisclosureContentProps>;

Collapsible.Content = Content;
interface Properties {
  /**
   * The disclosure's content. Rendered as `<Ariakit.DisclosureContent />`.
   *
   * @example
   *
   * ```tsx
   * <Collapsible.Content>
   *   <div>Content</div>
   * </Collapsible.Content>;
   * ```
   */
  Content: typeof Content;
}
