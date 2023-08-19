import "./Popover.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  Popover as AriakitPopover,
  PopoverDescription as AriakitPopoverDescription,
  PopoverDisclosure as AriakitPopoverDisclosure,
  PopoverDismiss as AriakitPopoverDismiss,
  PopoverHeading as AriakitPopoverHeading,
} from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type ExtendedProps,
  renderAsChild,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Popover");

// popover
// -------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.usePopoverStore,
  "Popover"
);

export const Popover: Component<PopoverProps, Properties> = createComponent(
  (props) => <Root animated {...props} />
);

/** `Popover` options. */
export type PopoverOptions = {
  /** The Ariakit store. */
  store?: Ariakit.PopoverStore;

  /** The children. */
  children?: React.ReactNode;
};

/** `Popover` props. */
export type PopoverProps = ExtendedProps<
  Ariakit.PopoverStoreProps,
  PopoverOptions
>;

// popover (compound)
// ------------------

/**
 * A popover. Compose it with its subcomponents to create a popover.
 *
 * @example
 *
 * ```tsx
 * <Popover>
 *   <Popover.Disclosure>
 *     <button>Click me!</button>
 *   </Popover.Disclosure>
 *   <Popover.Content>
 *     <Popover.Heading>Heading</Popover.Heading>
 *     <Popover.Description>Description</Popover.Description>
 *     <Popover.Dismiss>Dismiss</Popover.Dismiss>
 *   </Popover.Content>
 * </Popover>;
 * ```
 */

Popover.useStore = useStoreContext;
interface Properties {
  /**
   * `Popover` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const popoverStore = Popover.useStore();
   * ```
   */
  useStore: typeof useStoreContext;
}

// disclosure
// ----------

const Disclosure: Component<PopoverDisclosureProps> = createComponent(
  ({ children, ...props }) => (
    <AriakitPopoverDisclosure
      render={renderAsChild(children, { componentName: "Popover.Disclosure" })}
      store={useStoreContext()}
      {...props}
    />
  )
);

/** `Popover.Disclosure` props. */
export type PopoverDisclosureProps =
  ExtendedProps<Ariakit.PopoverDisclosureProps>;

Popover.Disclosure = Disclosure;
interface Properties {
  /**
   * A button that controls the visibility of the popover. The popover will be
   * anchored to it. Extends [`<Ariakit.PopoverDisclosure
   * />`](https://ariakit.org/reference/popover-disclosure). Rendered as the
   * passed child.
   *
   * @example
   *
   * ```tsx
   * <Popover.Disclosure>
   *   <button>Toggle popover</button>
   * </Popover.Disclosure>;
   * ```
   */
  Disclosure: typeof Disclosure;
}

// content
// -------

const Content: Component<PopoverContentProps> = createComponent(
  ({ children, ...props }) => {
    const store = props.store ?? useStoreContext();
    const mounted = store.useState("mounted");
    return mounted ? (
      <AriakitPopover
        gutter={4}
        store={useStoreContext()}
        {...props}
        className={clsx(styles.content, props.className)}
      >
        {children}
      </AriakitPopover>
    ) : null;
  }
);

/** `Popover.Content` props. */
export type PopoverContentProps = ExtendedProps<Ariakit.PopoverProps>;

Popover.Content = Content;
interface Properties {
  /**
   * The content of the popover. Extends [`<Ariakit.Popover
   * />`](https://ariakit.org/reference/popover). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Popover.Content>Hello!</Popover.Content>;
   * ```
   */
  Content: typeof Content;
}

// heading
// -------

const Heading: Component<PopoverHeadingProps> = createComponent(
  ({ children, ...props }) => (
    <AriakitPopoverHeading
      render={renderAsChild(children, { optional: true })}
      {...props}
    />
  )
);

/** `Popover.Heading` props. */
export type PopoverHeadingProps = ExtendedProps<Ariakit.PopoverHeadingProps>;

Popover.Heading = Heading;
interface Properties {
  /**
   * A heading for the popover. Extends [`<Ariakit.PopoverHeading
   * />`](https://ariakit.org/reference/popover-heading). Rendered as the passed
   * child if it is a React element. Else, rendered as `<h1 />`.
   *
   * @example
   *
   * ```tsx
   * <Popover.Content>
   *   <Popover.Heading>
   *     <h1>Heading</h1>
   *   </Popover.Heading>
   * </Popover.Content>;
   * ```
   */
  Heading: typeof Heading;
}

// description
// -----------

const Description: Component<PopoverDescriptionProps> = createComponent(
  ({ children, ...props }) => (
    <AriakitPopoverDescription
      render={renderAsChild(children, { optional: true })}
      {...props}
    />
  )
);

/** `Popover.Description` props. */
export type PopoverDescriptionProps =
  ExtendedProps<Ariakit.PopoverDescriptionProps>;

Popover.Description = Description;
interface Properties {
  /**
   * A description for the popover. Extends [`<Ariakit.PopoverDescription
   * />`](https://ariakit.org/reference/popover-description). Rendered as the
   * passed child if it is a React element. Else, rendered as `<p />`.
   *
   * @example
   *
   * ```tsx
   * <Popover.Content>
   *   <Popover.Description>
   *     <p>Description</p>
   *   </Popover.Description>
   * </Popover.Content>;
   * ```
   */
  Description: typeof Description;
}

// dismiss
// -------

const Dismiss: Component<PopoverDismissProps> = createComponent(
  ({ children, ...props }) => (
    <AriakitPopoverDismiss
      render={renderAsChild(children, { componentName: "Popover.Dismiss" })}
      {...props}
    />
  )
);

/** `Popover.Dismiss` props. */
export type PopoverDismissProps = ExtendedProps<Ariakit.PopoverDismissProps>;

Popover.Dismiss = Dismiss;
interface Properties {
  /**
   * A button that hides the popover. Extends [`<Ariakit.PopoverDismiss
   * />`](https://ariakit.org/reference/popover-dismiss). Rendered as the passed
   * child.
   *
   * @example
   *
   * ```tsx
   * <Popover.Content>
   *   <Popover.Dismiss>
   *     <button>Dismiss</button>
   *   </Popover.Dismiss>
   * </Popover.Content>;
   * ```
   */
  Dismiss: typeof Dismiss;
}
