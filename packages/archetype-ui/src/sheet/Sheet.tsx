import "./Sheet.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type ExtendedProps,
  renderAsChild,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

import { Button } from "../button";
import { luX } from "../icons";

const styles = scopedStyles("Sheet");

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useDialogStore,
  "Dialog"
);

// Sheet (compound)
// -----------------

/**
 * `Sheet` component.
 *
 * @example
 *
 * ```tsx
 * <Sheet>
 *   <Sheet.Disclosure>
 *     <Button>Open Sheet</Button>
 *   </Sheet.Disclosure>
 *   <Sheet.Content variant="sheet-right">
 *     <Sheet.Heading>Heading</Sheet.Heading>
 *     <Sheet.Description>Description</Sheet.Description>
 *     <Sheet.Dismiss>Dismiss</Sheet.Dismiss>
 *   </Sheet.Content>
 * </Sheet>;
 * ```
 */
export const Sheet: Component<SheetProps, Properties> = createComponent(
  (props) => <Root animated {...props} />
);

/** `SheetRoot` options. */
export type SheetOptions = {
  /** The Ariakit store. */
  store?: Ariakit.DialogStore;

  /** The children. */
  children?: React.ReactNode;
};

/** `SheetRoot` props. */
export type SheetProps = ExtendedProps<Ariakit.DialogStoreProps, SheetOptions>;

// disclosure
// ----------

const Disclosure: Component<SheetDisclosureProps> = createComponent(
  ({ children, ...props }) => (
    <Ariakit.DialogDisclosure
      render={renderAsChild(children)}
      store={useStoreContext()}
      {...props}
    />
  )
);

/** `Sheet.Disclosure` props. */
export type SheetDisclosureProps = ExtendedProps<Ariakit.DialogDisclosureProps>;

Sheet.Disclosure = Disclosure;
interface Properties {
  /**
   * The sheet's disclosure. Extends [`<Ariakit.DialogDisclosure
   * />`](https://ariakit.org/reference/dialog-disclosure). Rendered as the
   * passed child.
   *
   * @example
   *
   * ```tsx
   * <Sheet.Disclosure>
   *   <Button>Open sheet</Button>
   * </Sheet.Disclosure>;
   * ```
   */
  Disclosure: typeof Disclosure;
}

// Sheet
// ------

const CONTENT_DEFAULT_PROPS = {
  side: "right",
  dismissable: true,
} as const; // satisfies Partial<SheetContentProps>

const Content: Component<SheetContentProps> = createComponent(
  ({
    side = CONTENT_DEFAULT_PROPS.side,
    dismissable = CONTENT_DEFAULT_PROPS.dismissable,
    ...props
  }) => (
    <Ariakit.Dialog
      store={useStoreContext()}
      {...props}
      data-side={side}
      className={clsx(styles.content, props.className)}
    >
      {dismissable && (
        <Dismiss>
          <Button
            className={styles.icon}
            variant="ghost"
            aria-label="Dismiss dialog"
            icon={luX}
            size="icon"
          />
        </Dismiss>
      )}
      {props.children}
    </Ariakit.Dialog>
  )
);

/** `Sheet.Content` options. */
export type SheetContentOptions = {
  /**
   * The side where the sheet opens from.
   *
   * @default "default"
   */
  side?: "top" | "bottom" | "right" | "left";
  /**
   * Rather or not the sheet is dismissable.
   *
   * @default true
   */
  dismissable?: boolean;
};

/** `Sheet.Content` props. */
export type SheetContentProps = ExtendedProps<
  Ariakit.DialogProps,
  SheetContentOptions
>;

Sheet.Content = Content;
interface Properties {
  /**
   * The sheet's content. Rendered as `<Ariakit.Dialog />`.
   *
   * @example
   *
   * ```tsx
   * <Sheet.Content variant="sheet-right">
   *   <Sheet.Heading>Heading</Sheet.Heading>
   *   <Sheet.Description>Description</Sheet.Description>
   *   <Sheet.Dismiss>Dismiss</Sheet.Dismiss>
   * </Sheet.Content>;
   * ```
   */
  Content: typeof Content;
}

// Title
// -------

const Title: Component<SheetTitleProps> = createComponent((props) => (
  <Ariakit.DialogHeading
    className={styles.title}
    store={useStoreContext()}
    {...props}
  />
));

/** `Sheet.Heading` props. */
export type SheetTitleProps = ExtendedProps<Ariakit.DialogHeadingProps>;

Sheet.Title = Title;
interface Properties {
  /**
   * The sheet's title. Rendered as `<Ariakit.DialogHeading />`.
   *
   * @example
   *
   * ```tsx
   * <Sheet.Title>Title</Sheet.Title>;
   * ```
   */
  Title: typeof Title;
}

// description
// -----------

const Description: Component<SheetDescriptionProps> = createComponent(
  (props) => (
    <Ariakit.DialogDescription
      className={styles.description}
      store={useStoreContext()}
      {...props}
    />
  )
);

/** `Sheet.Description` props. */
export type SheetDescriptionProps =
  ExtendedProps<Ariakit.DialogDescriptionProps>;

Sheet.Description = Description;
interface Properties {
  /**
   * The sheet's description. Rendered as `<Ariakit.DialogDescription />`.
   *
   * @example
   *
   * ```tsx
   * <Sheet.Description>Description</Sheet.Description>;
   * ```
   */
  Description: typeof Description;
}

// dismiss
// -------

const Dismiss: Component<SheetDismissProps> = createComponent(
  ({ children, ...props }) => (
    <Ariakit.DialogDismiss
      render={renderAsChild(children, {
        componentName: "Dialog.Dismiss",
        excludeProps: ["children"],
      })}
      {...props}
    />
  )
);

/** `Sheet.Dismiss` props. */
export type SheetDismissProps = ExtendedProps<Ariakit.DialogDismissProps>;

Sheet.Dismiss = Dismiss;
interface Properties {
  /**
   * The sheet's dismiss button. Rendered as `<Ariakit.DialogDismiss />`.
   *
   * @example
   *
   * ```tsx
   * <Sheet.Dismiss>Dismiss</Sheet.Dismiss>;
   * ```
   */
  Dismiss: typeof Dismiss;
}

const Header: Component<SheetHeaderProps> = createComponent((props) => (
  <div {...props} className={clsx(styles.header, props.className)} />
));

export type SheetHeaderProps = ExtendedProps<"div">;

Sheet.Header = Header;
interface Properties {
  /**
   * The sheet's header. Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Sheet.Header>Header</Sheet.Header>;
   * ```
   */
  Header: typeof Header;
}

const Footer: Component<SheetFooterProps> = createComponent((props) => (
  <div {...props} className={clsx(styles.footer, props.className)} />
));

export type SheetFooterProps = ExtendedProps<"div">;

Sheet.Footer = Footer;
interface Properties {
  /**
   * The sheet's footer. Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Sheet.Footer>Footer</Sheet.Footer>;
   * ```
   */
  Footer: typeof Footer;
}
