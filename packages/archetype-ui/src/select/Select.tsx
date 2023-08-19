import "./Select.scoped.css";

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
import { luCheck, luChevronDown } from "../icons";
import { Label as LabelComponent } from "../label";

const styles = scopedStyles("Select");

// select
// ------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useSelectStore,
  "Select"
);

/**
 * A select input.
 *
 * A non-set value is represented by `"$no-value$"` (which is the default) or,
 * in the case of multiple selection, an empty array. When no value is set, a
 * placeholder is displayed instead.
 *
 * The `"$no-value$"` value is available as `SELECT_NO_VALUE` for convenience.
 *
 * To select the first item by default, set `defaultValue` to `undefined`.
 *
 * @example
 *
 * ```tsx
 * <Select>
 *   <Select.Label>Favorite fruit</Select.Label>
 *   <Select.Input />
 *   <Select.Popover>
 *     <Select.Item value="apple">Apple</Select.Item>
 *     <Select.Item value="orange">Orange</Select.Item>
 *   </Select.Popover>
 * </Select>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // uncontrolled
 * <Select defaultValue="broccoli">...</Select>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // controlled
 * const [value, setValue] = useState<SelectValue>("broccoli");
 * <Select value={value} setValue={setValue}>
 *   ...
 * </Select>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // groups and separators
 * <Select>
 *   <Select.Input />
 *   <Select.Popover>
 *     <Select.Group>
 *       <Select.GroupLabel>Fruits</Select.GroupLabel>
 *       <Select.Item value="apple">Apple</Select.Item>
 *       <Select.Item value="orange">Orange</Select.Item>
 *     </Select.Group>
 *     <Select.Separator />
 *     <Select.Group>
 *       <Select.GroupLabel>Vegetables</Select.GroupLabel>
 *       <Select.Item value="broccoli">Broccoli</Select.Item>
 *       <Select.Item value="onion">Onion</Select.Item>
 *     </Select.Group>
 *   </Select.Popover>
 * </Select>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // multiple selection
 * <Select defaultValue={["apple", "broccoli"]}>...</Select>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // custom placeholder
 * <Select>
 *   <Select.Input placeholder="Select a food" />
 *   ...
 * </Select>;
 * ```
 */
export const Select: Component<SelectProps, Properties> = createComponent(
  ({ ...props }) => <Root {...DEFAULT_STORE_PROPS} {...props} />
);

/** `Select` options. */
export type SelectOptions = {
  /** The Ariakit store. */
  store?: Ariakit.SelectStore;

  /** The children. */
  children?: React.ReactNode;
};

/** `Select` props. */
export type SelectProps = ExtendedProps<
  Ariakit.SelectStoreProps,
  SelectOptions
>;

/** `Select` value. */
export type SelectValue = Ariakit.SelectStoreState["value"];

// store
// -----

/** `Select` value representing no value. */
export const SELECT_NO_VALUE = "$no-value$";

const DEFAULT_STORE_PROPS = {
  animated: true,
  placement: "bottom",
  defaultValue: SELECT_NO_VALUE,
} as const; // satisfies Ariakit.SelectStoreProps

function useStore(props?: Ariakit.SelectStoreProps) {
  return Ariakit.useSelectStore({ ...DEFAULT_STORE_PROPS, ...props });
}

Select.useStore = useStore;
Select.useStoreContext = useStoreContext;
interface Properties {
  /**
   * `Select` Ariakit store hook. Extends
   * [`Ariakit.useSelectStore`](https://ariakit.org/reference/use-select-store).
   *
   * @example
   *
   * ```tsx
   * const selectStore = Select.useStore();
   * ```
   */
  useStore: typeof useStore;

  /**
   * `Select` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const selectStore = Select.useStoreContext();
   * ```
   */
  useStoreContext: typeof useStoreContext;
}

// input
// -----

function getSelectInputLabel(store: Ariakit.SelectStore, placeholder: string) {
  const value = store.useState("value");
  const items = store.useState("items");
  const selectedItems = items.filter(
    (item) =>
      item.value != null &&
      (Array.isArray(value)
        ? value.includes(item.value)
        : value != null && value === item.value)
  );
  const isPlaceholder = !(selectedItems.length > 0);
  const label = isPlaceholder
    ? placeholder
    : selectedItems
        .map((item) => item.element?.textContent)
        .filter(Boolean)
        .join(", ");
  return { label, isPlaceholder };
}

const DEFAULT_INPUT_PROPS = {
  placeholder: "No items selected",
} as const; // satisfies Partial<SelectInputProps>

const Input: Component<SelectInputProps> = createComponent(
  ({ placeholder = DEFAULT_INPUT_PROPS.placeholder, children, ...props }) => {
    const store = props.store ?? useStoreContext();
    const { label, isPlaceholder } = getSelectInputLabel(store, placeholder);
    return (
      <Ariakit.Select
        store={useStoreContext()}
        data-is-placeholder={isPlaceholder ? "" : undefined}
        {...props}
        className={clsx(styles.input, props.className)}
      >
        {children ?? (
          <div className={styles.inputLabel}>
            <span className={styles.text}>{label}</span>
            <Icon icon={luChevronDown} className={styles.icon} />
          </div>
        )}
      </Ariakit.Select>
    );
  }
);

/** `Select.Input` options. */
export type SelectInputOptions = {
  /**
   * Placeholder that is displayed when no value has been set.
   *
   * @default "No items selected"
   */
  placeholder?: string;
};

/** `Select.Input` props. */
export type SelectInputProps = ExtendedProps<
  Ariakit.SelectProps,
  SelectInputOptions
>;

Select.Input = Input;
interface Properties {
  /**
   * The select input. Extends [`<Ariakit.Select
   * />`](https://ariakit.org/reference/select). Rendered as `<button />`.
   *
   * Displays the text content of the selected item by default, unless
   * `children` is provided.
   *
   * @example
   *
   * ```tsx
   * <Select>
   *   <Select.Input />
   *   ...
   * </Select>;
   * ```
   */
  Input: typeof Input;
}

// label
// -----

const Label: Component<SelectLabelProps> = createComponent(
  ({ children, ...props }) => (
    <Ariakit.SelectLabel
      render={
        renderAsChild(children, { optional: true }) ?? (
          <LabelComponent>{children}</LabelComponent>
        )
      }
      store={useStoreContext()}
      {...props}
    />
  )
);

/** `Select.Label` props. */
export type SelectLabelProps = ExtendedProps<Ariakit.SelectLabelProps>;

Select.Label = Label;
interface Properties {
  /**
   * A label for `<Select.Input />`. Extends [`<Ariakit.SelectLabel
   * />`](https://ariakit.org/reference/select-label). Rendered as the passed
   * child if it is a React element. Else, rendered as `<Label />` (`<label
   * />`).
   *
   * @example
   *
   * ```tsx
   * <Select>
   *   <Select.Label>Favorite fruit</Select.Label>
   *   <Select.Input />
   *   ...
   * </Select>;
   * ```
   */
  Label: typeof Label;
}

// popover
// -------

const DEFAULT_POPOVER_PROPS = {
  gutter: 4,
  sameWidth: true,
} as const; // satisfies Partial<SelectPopoverProps>

const Popover: Component<SelectPopoverProps> = createComponent(
  ({
    gutter = DEFAULT_POPOVER_PROPS.gutter,
    sameWidth = DEFAULT_POPOVER_PROPS.sameWidth,
    ...props
  }) => {
    const store = props.store ?? useStoreContext();
    const placement = store.useState("placement");
    const side = placement.split("-")[0];
    return (
      <Ariakit.SelectPopover
        portal
        store={useStoreContext()}
        data-side={side}
        gutter={gutter}
        sameWidth={sameWidth}
        {...props}
        className={clsx(styles.popover, props.className)}
      />
    );
  }
);

/** `Select.Popover` props. */
export type SelectPopoverProps = ExtendedProps<Ariakit.SelectPopoverProps>;

Select.Popover = Popover;
interface Properties {
  /**
   * The select popover. Extends [`<Ariakit.SelectPopover
   * />`](https://ariakit.org/reference/select-popover). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Select.Popover>
   *   <Select.Item value="apple">Apple</Select.Item>
   *   <Select.Item value="orange">Orange</Select.Item>
   * </Select.Popover>;
   * ```
   */
  Popover: typeof Popover;
}

// separator
// ---------

const Separator: Component<SelectSeparatorProps> = createComponent((props) => (
  <Ariakit.SelectSeparator
    {...props}
    className={clsx(styles.separator, props.className)}
  />
));

/** `Select.Separator` props. */
export type SelectSeparatorProps = ExtendedProps<Ariakit.SelectSeparatorProps>;

Select.Separator = Separator;
interface Properties {
  /**
   * A separator for select items. Extends [`<Ariakit.SelectSeparator
   * />`](https://ariakit.org/reference/select-separator). Rendered as `<hr
   * />`.
   *
   * @example
   *
   * ```tsx
   * <Select.Popover>
   *   <Select.Item value="apple">Apple</Select.Item>
   *   <Select.Separator />
   *   <Select.Item value="orange">Orange</Select.Item>
   * </Select.Popover>;
   * ```
   */
  Separator: typeof Separator;
}

// group
// -----

const Group: Component<SelectGroupProps> = Ariakit.SelectGroup;

/** `Select.Group` props. */
export type SelectGroupProps = ExtendedProps<Ariakit.SelectGroupProps>;

Select.Group = Group;
interface Properties {
  /**
   * A select group. Extends [`<Ariakit.SelectGroup
   * />`](https://ariakit.org/reference/select-group). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Select.Popover>
   *   <Select.Group>
   *     <Select.Item value="apple">Apple</Select.Item>
   *     <Select.Item value="orange">Orange</Select.Item>
   *   </Select.Group>
   * </Select.Popover>;
   * ```
   */
  Group: typeof Group;
}

// group label
// -----------

const GroupLabel: Component<SelectGroupLabelProps> = createComponent(
  (props) => (
    <Ariakit.SelectGroupLabel
      store={useStoreContext()}
      {...props}
      className={clsx(styles.groupLabel, props.className)}
    />
  )
);

/** `Select.GroupLabel` props. */
export type SelectGroupLabelProps =
  ExtendedProps<Ariakit.SelectGroupLabelProps>;

Select.GroupLabel = GroupLabel;
interface Properties {
  /**
   * Renders a label in a select group. Extends [`<Ariakit.SelectGroupLabel
   * />`](https://ariakit.org/reference/select-group-label). Rendered as `<div
   * />`.
   *
   * @example
   *
   * ```tsx
   * <Select.Group>
   *   <Select.GroupLabel>Fruit</Select.GroupLabel>
   *   <Select.Item value="apple">Apple</Select.Item>
   *   <Select.Item value="orange">Orange</Select.Item>
   * </Select.Group>;
   * ```
   */
  GroupLabel: typeof GroupLabel;
}

// item
// ----

function isItemSelected(
  store: Ariakit.SelectStore,
  { value }: Pick<Ariakit.SelectItemProps, "value">
) {
  const itemValue = store.useState("value");
  return (
    (value != null && itemValue === value) ||
    (Array.isArray(itemValue) && value != null && itemValue.includes(value))
  );
}

export const Item: Component<SelectItemProps> = createComponent(
  ({ children, ...props }) => {
    const store = props.store ?? useStoreContext();
    const selected = isItemSelected(store, props);
    return (
      <Ariakit.SelectItem
        store={useStoreContext()}
        data-selected={selected}
        {...props}
        className={clsx(styles.item, props.className)}
      >
        <Icon icon={luCheck} className={styles.icon} />
        <span className={styles.content}>{children ?? props.value}</span>
      </Ariakit.SelectItem>
    );
  }
);

/** `Select.Item` props. */
export type SelectItemProps = ExtendedProps<Ariakit.SelectItemProps>;

Select.Item = Item;
interface Properties {
  /**
   * A select item. Extends [`<Ariakit.SelectItem
   * />`](https://ariakit.org/reference/select-item). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Select.Popover>
   *   <Select.Item value="apple">Apple</Select.Item>
   *   <Select.Item value="orange">Orange</Select.Item>
   * </Select.Popover>;
   * ```
   */
  Item: typeof Item;
}
