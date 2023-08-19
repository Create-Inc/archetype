import "./Combobox.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  Combobox as AriakitCombobox,
  ComboboxItem as AriakitComboboxItem,
  ComboboxPopover as AriakitComboboxPopover,
} from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Combobox");

// combobox
// --------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useComboboxStore,
  "Combobox"
);

const _Root: Component<ComboboxProps> = createComponent(Root);

/** `Combobox` options. */
export type ComboboxOptions = {
  /** The Ariakit store. */
  store?: Ariakit.ComboboxStore;

  /** The children. */
  children?: React.ReactNode;
};

/** `Combobox` props. */
export type ComboboxProps = ExtendedProps<
  Ariakit.ComboboxStoreProps,
  ComboboxOptions
>;

// input
// -----

const Input: Component<ComboboxInputProps> = createComponent((props) => (
  <AriakitCombobox
    store={useStoreContext()}
    {...props}
    className={clsx(styles.input, props.className)}
  />
));

/** `Combobox.Input` props. */
export type ComboboxInputProps = ExtendedProps<Ariakit.ComboboxProps>;

// popover
// -------

const Popover: Component<ComboboxPopoverProps> = createComponent((props) => (
  <AriakitComboboxPopover
    store={useStoreContext()}
    sameWidth
    {...props}
    className={clsx(styles.popover, props.className)}
  />
));

/** `Combobox.Popover` props. */
export type ComboboxPopoverProps = ExtendedProps<Ariakit.ComboboxPopoverProps>;

// item
// ----

const Item: Component<ComboboxItemProps> = createComponent((props) => (
  <AriakitComboboxItem
    store={useStoreContext()}
    {...props}
    className={clsx(styles.item, props.className)}
  />
));

/** `Combobox.Item` props. */
export type ComboboxItemProps = ExtendedProps<Ariakit.ComboboxItemProps>;

// combobox (compound)
// --------

/**
 * `Combobox` component.
 *
 * @example
 *
 * ```tsx
 * <Combobox>
 *   <label>
 *     Country
 *     <Combobox.Input />
 *   </label>
 *   <Combobox.Popover>
 *     <Combobox.Item value="Spain" />
 *     <Combobox.Item value="United States" />
 *   </Combobox.Popover>
 * </Combobox>;
 * ```
 */

export const Combobox = _Root as ComboboxComponent;
Combobox.useStore = useStoreContext;
Combobox.Input = Input;
Combobox.Popover = Popover;
Combobox.Item = Item;

type ComboboxComponent = typeof _Root & {
  /**
   * `Combobox` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const comboboxStore = Combobox.useStore();
   * ```
   */
  useStore: typeof useStoreContext;

  /**
   * The input of a combobox. Extends [`<Ariakit.Combobox
   * />`](https://ariakit.org/reference/combobox). Rendered as `<input />`.
   *
   * @example
   *
   * ```tsx
   * <Combobox.Input />;
   * ```
   */
  Input: typeof Input;

  /**
   * The popover of a combobox. Extends [`<Ariakit.ComboboxPopover
   * />`](https://ariakit.org/reference/combobox-popover). Rendered as `<div
   * />`.
   *
   * @example
   *
   * ```tsx
   * <Combobox.Popover />;
   * ```
   */
  Popover: typeof Popover;

  /**
   * A combobox item. Extends [`<Ariakit.ComboboxItem
   * />`](https://ariakit.org/reference/combobox-item). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Combobox.Item value="Spain" />;
   * ```
   */
  Item: typeof Item;
};
