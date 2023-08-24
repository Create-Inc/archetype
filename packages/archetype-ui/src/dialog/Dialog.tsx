import "./Dialog.scoped.css";

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

import { Icon } from "../icon";
import { luX } from "../icons";

const styles = scopedStyles("Dialog");

// dialog
// ------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useDialogStore,
  "Dialog"
);

/**
 * A dialog. It can be displayed as a sheet with `variant="sheet"`.
 *
 * @example
 *
 * ```tsx
 * <Dialog>
 *   <Dialog.Disclosure>
 *     <Button>Open Dialog</Button>
 *   </Dialog.Disclosure>
 *   <Dialog.Content>
 *     <Dialog.Header>
 *       <Dialog.Heading>Heading</Dialog.Heading>
 *       <Dialog.Description>Description</Dialog.Description>
 *     </Dialog.Header>
 *     Content
 *     <Dialog.Footer>Footer</Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // controlled
 * const [open, setOpen] = useState(false);
 * <Dialog open={open} setOpen={setOpen}>
 *   <Dialog.Content>...</Dialog.Content>
 * </Dialog>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // dismiss button
 * <Dialog>
 *   <Dialog.Content>
 *     ...
 *     <Dialog.Footer>
 *       <Dialog.Dismiss>
 *         <Button>Close dialog</Button>
 *       </Dialog.Dismiss>
 *     </Dialog.Footer>
 *   </Dialog.Content>
 * </Dialog>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // as sheet (default side is "right")
 * <Dialog>
 *   <Dialog.Content variant="sheet" side="top">
 *     ...
 *   </Dialog.Content>
 * </Dialog>;
 * ```
 */
export const Dialog: Component<DialogProps, Properties> = createComponent(
  (props) => <Root {...DEFAULT_STORE_PROPS} {...props} />
);

/** `Dialog` options. */
export type DialogOptions = {
  /** The Ariakit store. */
  store?: Ariakit.DialogStore;

  /** The children. */
  children?: React.ReactNode;
};

/** `Dialog` props. */
export type DialogProps = ExtendedProps<
  Ariakit.DialogStoreProps,
  DialogOptions
>;

// store
// -----

const DEFAULT_STORE_PROPS = {
  animated: true,
} satisfies Ariakit.DialogStoreProps;

function useStore(props?: Ariakit.DialogStoreProps) {
  return Ariakit.useDialogStore({ ...DEFAULT_STORE_PROPS, ...props });
}

Dialog.useStore = useStore;
Dialog.useStoreContext = useStoreContext;
interface Properties {
  /**
   * `Dialog` Ariakit store hook. Extends
   * [`Ariakit.useDialogStore`](https://ariakit.org/reference/use-dialog-store).
   *
   * @example
   *
   * ```tsx
   * const dialogStore = Dialog.useStore();
   * ```
   */
  useStore: typeof useStore;

  /**
   * `Dialog` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const dialogStore = Dialog.useStoreContext();
   * ```
   */
  useStoreContext: typeof useStoreContext;
}

// disclosure
// ----------

const Disclosure: Component<DialogDisclosureProps> = createComponent(
  ({ children, ...props }) => (
    <Ariakit.DialogDisclosure
      render={renderAsChild(children, { componentName: "Dialog.Disclosure" })}
      store={useStoreContext()}
      {...props}
    />
  )
);

/** `Dialog.Disclosure` props. */
export type DialogDisclosureProps =
  ExtendedProps<Ariakit.DialogDisclosureProps>;

Dialog.Disclosure = Disclosure;
interface Properties {
  /**
   * A button that controls the visibility of the dialog. Extends
   * [`<Ariakit.DialogDisclosure
   * />`](https://ariakit.org/reference/dialog-disclosure). Rendered as the
   * passed child.
   *
   * @example
   *
   * ```tsx
   * <Dialog>
   *   <Dialog.Disclosure>
   *     <Button>Settings</Button>
   *   </Dialog.Disclosure>
   *   ...
   * </Dialog>;
   * ```
   */
  Disclosure: typeof Disclosure;
}

// content
// -------

const DEFAULT_CONTENT_PROPS = {
  variant: "dialog",
  side: "right",
} satisfies Partial<DialogContentProps>;

const Content: Component<DialogContentProps> = createComponent(
  ({
    variant = DEFAULT_CONTENT_PROPS.variant,
    side = DEFAULT_CONTENT_PROPS.side,
    children,
    ...props
  }) => {
    const store = props.store ?? useStoreContext();
    const mounted = store.useState("mounted");
    return mounted ? (
      <Ariakit.Dialog
        store={useStoreContext()}
        backdrop={<div className={styles.backdrop} />}
        data-variant={variant}
        data-side={side}
        {...props}
        className={clsx(styles.content, props.className)}
      >
        {children}
        <Ariakit.DialogDismiss className={styles.closeButton}>
          <Icon icon={luX} className={styles.icon} />
        </Ariakit.DialogDismiss>
      </Ariakit.Dialog>
    ) : null;
  }
);

/** `Dialog.Content` options. */
export type DialogContentOptions = {
  /**
   * The visual appearance of the dialog.
   *
   * @default "dialog"
   */
  variant?: "dialog" | "sheet";

  /**
   * The side in which the sheet will be positioned. Only has effect when
   * `variant="sheet"` is set.
   *
   * @default "right"
   */
  side?: "right" | "left" | "top" | "bottom";
};

/** `Dialog.Content` props. */
export type DialogContentProps = ExtendedProps<
  Ariakit.DialogProps,
  DialogContentOptions
>;

Dialog.Content = Content;
interface Properties {
  /**
   * The content of the dialog. Extends [`<Ariakit.Dialog
   * />`](https://ariakit.org/reference/dialog). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog>
   *   ...
   *   <Dialog.Content>
   *     <Dialog.Header>
   *       <Dialog.Heading>Heading</Dialog.Heading>
   *       <Dialog.Description>Description</Dialog.Description>
   *     </Dialog.Header>
   *     Content
   *   </Dialog.Content>
   * </Dialog>;
   * ```
   */
  Content: typeof Content;
}

// header
// ------

const Header: Component<DialogHeaderProps> = createComponent((props) => (
  <div {...props} className={clsx(styles.header, props.className)} />
));

/** `Dialog.Header` props. */
export type DialogHeaderProps = ExtendedProps<"div">;

Dialog.Header = Header;
interface Properties {
  /**
   * The header of the dialog. Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Content>
   *   <Dialog.Header>
   *     <Dialog.Heading>Heading</Dialog.Heading>
   *     <Dialog.Description>Description</Dialog.Description>
   *   </Dialog.Header>
   *   ...
   * </Dialog.Content>;
   * ```
   */
  Header: typeof Header;
}

// heading
// -------

const Heading: Component<DialogHeadingProps> = createComponent((props) => (
  <Ariakit.DialogHeading
    {...props}
    className={clsx(styles.heading, props.className)}
  />
));

export type DialogHeadingProps = ExtendedProps<Ariakit.DialogHeadingProps>;

Dialog.Heading = Heading;
interface Properties {
  /**
   * A heading for the dialog. Extends [`<Ariakit.DialogHeading
   * />`](https://ariakit.org/reference/dialog-heading). Rendered as `<h1 />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Header>
   *   <Dialog.Heading>Heading</Dialog.Heading>
   *   ...
   * </Dialog.Header>;
   * ```
   */
  Heading: typeof Heading;
}

// description
// -----------

const Description: Component<DialogDescriptionProps> = createComponent(
  (props) => (
    <Ariakit.DialogDescription
      store={useStoreContext()}
      {...props}
      className={clsx(styles.description, props.className)}
    />
  )
);

/** `Dialog.Description` props. */
export type DialogDescriptionProps =
  ExtendedProps<Ariakit.DialogDescriptionProps>;

Dialog.Description = Description;
interface Properties {
  /**
   * A description for the dialog. Extends [`<Ariakit.DialogDescription
   * />`](https://ariakit.org/reference/dialog-description). Rendered as `<p
   * />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Header>
   *   ...
   *   <Dialog.Description>Description</Dialog.Description>
   * </Dialog.Header>;
   * ```
   */
  Description: typeof Description;
}

// footer
// ------

const Footer: Component<DialogFooterProps> = createComponent((props) => (
  <div {...props} className={clsx(styles.footer, props.className)} />
));

export type DialogFooterProps = ExtendedProps<"div">;

Dialog.Footer = Footer;
interface Properties {
  /**
   * The footer of the dialog. Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Content>
   *   ...
   *   <Dialog.Footer>Footer</Dialog.Footer>
   * </Dialog.Content>;
   * ```
   */
  Footer: typeof Footer;
}

// dismiss
// -------

const Dismiss: Component<DialogDismissProps> = createComponent(
  ({ children, ...props }) => (
    <Ariakit.DialogDismiss
      render={renderAsChild(children, { componentName: "Dialog.Dismiss" })}
      store={useStoreContext()}
      {...props}
    />
  )
);

/** `Dialog.Dismiss` props. */
export type DialogDismissProps = ExtendedProps<Ariakit.DialogDismissProps>;

Dialog.Dismiss = Dismiss;
interface Properties {
  /**
   * A button that hides the dialog. Extends [`<Ariakit.DialogDismiss
   * />`](https://ariakit.org/reference/dialog-dismiss). Rendered as the passed
   * child.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Content>
   *   ...
   *   <Dialog.Dismiss>
   *     <Button>Dismiss</Button>
   *   </Dialog.Dismiss>
   *   ...
   * </Dialog.Content>;
   * ```
   */
  Dismiss: typeof Dismiss;
}
