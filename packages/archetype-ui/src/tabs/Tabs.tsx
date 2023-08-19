import "./Tabs.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Tabs");

// tabs
// ----

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useTabStore,
  "Tabs"
);

/**
 * A tab.
 *
 * @example
 *
 * ```tsx
 * <Tabs defaultValue="account" className="w-[400px]">
 *   <Tabs.List>
 *     <Tabs.Trigger value="account">Account</Tabs.Trigger>
 *     <Tabs.Trigger value="password">Password</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="account">
 *     Make changes to your account here.
 *   </Tabs.Content>
 *   <Tabs.Content value="password">
 *     Change your password here.
 *   </Tabs.Content>
 * </Tabs>;
 * ```
 */
export const Tabs: Component<TabsProps, Properties> = createComponent(
  ({ ...props }) => <Root {...props} />
);

/** `Tab` options. */
export type TabsOptions = {
  /** The Ariakit store. */
  store?: Ariakit.TabStore;

  /** The children. */
  children?: React.ReactNode;
};

/** `Tab` props. */
export type TabsProps = ExtendedProps<Ariakit.TabStoreProps, TabsOptions>;

Tabs.useStore = useStoreContext;
interface Properties {
  /**
   * `Tabs` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const tabsStore = Tabs.useStore();
   * ```
   */
  useStore: typeof useStoreContext;
}

// List
// ----

const List: Component<TabsListProps> = createComponent((props) => (
  <Ariakit.TabList
    store={useStoreContext()}
    {...props}
    className={clsx(styles.list, props.className)}
  />
));

/** `Tab.List` props. */
export type TabsListProps = ExtendedProps<Ariakit.TabListProps>;

Tabs.List = List;
interface Properties {
  /**
   * `Tabs.List` Ariakit component. The list of the tab triggers. Extends
   * [`<Ariakit.TabList />`](https://ariakit.org/reference/tab-list). Rendered
   * as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Tabs.List>
   *   <Tabs.Trigger value="account">Account</Tabs.Trigger>
   *   <Tabs.Trigger value="password">Password</Tabs.Trigger>
   * </Tabs.List>;
   * ```
   */
  List: typeof List;
}

// Trigger
// -------
const Trigger: Component<TabsTriggerProps> = createComponent((props) => (
  <Ariakit.Tab
    store={useStoreContext()}
    {...props}
    className={clsx(styles.trigger, props.className)}
  />
));

/** `Tab.Trigger` props. */
export type TabsTriggerProps = ExtendedProps<Ariakit.TabProps>;

Tabs.Trigger = Trigger;
interface Properties {
  /**
   * `Tabs.Trigger`. The tab trigger. Extends [`<Ariakit.Tab
   * />`](https://ariakit.org/reference/tab). Rendered as `<button />`.
   *
   * @example
   *
   * ```tsx
   * <Tabs.Trigger value="account">Account</Tabs.Trigger>;
   * ```
   */
  Trigger: typeof Trigger;
}

// Content
// -------
const Content: Component<TabsContentProps> = createComponent((props) => (
  <Ariakit.TabPanel
    store={useStoreContext()}
    {...props}
    className={clsx(styles.content, props.className)}
  />
));

/** `Tab.Content ` props. */
export type TabsContentProps = ExtendedProps<Ariakit.TabPanelProps>;

Tabs.Content = Content;
interface Properties {
  /**
   * `Tabs.Content`. The tab content. Extends [`<Ariakit.TabPanel
   * />`](https://ariakit.org/reference/tab-panel). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Tabs.Content value="account">Account</Tabs.Content>;
   * ```
   */
  Content: typeof Content;
}
