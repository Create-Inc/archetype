import "./Dialog.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  Dialog as AriakitDialog,
  DialogDescription as AriakitDialogDescription,
  DialogDisclosure as AriakitDialogDisclosure,
  DialogDismiss as AriakitDialogDismiss,
  DialogHeading as AriakitDialogHeading,
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

const styles = scopedStyles("Dialog");

// dialog
// ------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useDialogStore,
  "Dialog"
);

// dialog (compound)
// -----------------

/**
 * A dialog.
 *
 * @example
 *
 * ```tsx
 * <Dialog>
 *   <Dialog.Disclosure>
 *     <Button>Open Dialog</Button>
 *   </Dialog.Disclosure>
 *   <Dialog.Content variant="sheet-right">
 *     <Dialog.Heading>Heading</Dialog.Heading>
 *     <Dialog.Description>Description</Dialog.Description>
 *     <Dialog.Dismiss>Dismiss</Dialog.Dismiss>
 *   </Dialog.Content>
 * </Dialog>;
 * ```
 */
export const Dialog: Component<DialogProps, Properties> = createComponent(
  (props) => <Root animated {...props} />
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

Dialog.useStoreContext = useStoreContext;
interface Properties {
  /**
   * `Dialog` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const dialogStore = Dialog.useStore();
   * ```
   */
  useStoreContext: typeof useStoreContext;
}

// disclosure
// ----------

const Disclosure: Component<DialogDisclosureProps> = createComponent(
  ({ children, ...props }) => (
    <AriakitDialogDisclosure
      render={renderAsChild(children)}
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
   * <Dialog.Disclosure>
   *   <button>Show dialog</button>
   * </Dialog.Disclosure>;
   * ```
   */
  Disclosure: typeof Disclosure;
}

// dialog
// ------
const Content: Component<DialogContentProps> = createComponent((props) => (
  <AriakitDialog
    store={useStoreContext()}
    {...props}
    className={clsx(styles.content, props.className)}
  />
));

/** `Dialog.Content` props. */
export type DialogContentProps = ExtendedProps<Ariakit.DialogProps>;

Dialog.Content = Content;
interface Properties {
  /**
   * The content of the dialog. Extends [`<Ariakit.Dialog
   * />`](https://ariakit.org/reference/dialog). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Content>Hello!</Dialog.Content>;
   * ```
   */
  Content: typeof Content;
}

// heading
// -------

const Heading: Component<DialogHeadingProps> = createComponent(
  ({ children, ...props }) => (
    <AriakitDialogHeading
      className={styles.heading}
      render={renderAsChild(children)}
      store={useStoreContext()}
      {...props}
    />
  )
);

/** `Dialog.Heading` props. */
export type DialogHeadingProps = ExtendedProps<Ariakit.DialogHeadingProps>;

Dialog.Heading = Heading;
interface Properties {
  /**
   * A heading for the dialog. Extends [`<Ariakit.DialogHeading
   * />`](https://ariakit.org/reference/dialog-heading). Rendered as the passed
   * child if it is a React element. Else, rendered as `<h1 />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Content>
   *   <Dialog.Heading>
   *     <h1>Heading</h1>
   *   </Dialog.Heading>
   * </Dialog.Content>;
   * ```
   */
  Heading: typeof Heading;
}

// description
// -----------

const Description: Component<DialogDescriptionProps> = createComponent(
  ({ children, ...props }) => (
    <AriakitDialogDescription
      className={styles.description}
      render={renderAsChild(children)}
      store={useStoreContext()}
      {...props}
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
   * />`](https://ariakit.org/reference/dialog-description). Rendered as the
   * passed child if it is a React element. Else, rendered as `<p />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Content>
   *   <Dialog.Description>
   *     <p>Description</p>
   *   </Dialog.Description>
   * </Dialog.Content>;
   * ```
   */
  Description: typeof Description;
}

// dismiss
// -------

const Dismiss: Component<DialogDismissProps> = createComponent(
  ({ children, ...props }) => (
    <AriakitDialogDismiss
      render={renderAsChild(children)}
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
   * A button that hides the dialog. The passed child will act as the dismiss
   * button. Extends [`<Ariakit.DialogDismiss
   * />`](https://ariakit.org/reference/dialog-dismiss). Rendered as the passed
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

const Footer: Component<DialogFooterProps> = createComponent((props) => (
  <div className={styles.footer} {...props} />
));

export type DialogFooterProps = ExtendedProps<"div">;

Dialog.Footer = Footer;
interface Properties {
  /**
   * A footer for the dialog. Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Footer>
   *   <Dialog.Dismiss>
   *     <Button type="submit">Save changes</Button>
   *   </Dialog.Dismiss>
   * </Dialog.Footer>;
   * ```
   */
  Footer: typeof Footer;
}

const Title: Component<DialogTitleProps> = createComponent((props) => (
  <h1 className={styles.title} {...props} />
));

export type DialogTitleProps = ExtendedProps<"h1">;

Dialog.Title = Title;
interface Properties {
  /**
   * A title for the dialog. Rendered as `<h1 />`.
   *
   * @example
   *
   * ```tsx
   * <Dialog.Title>Title</Dialog.Title>;
   * ```
   */
  Title: typeof Title;
}
