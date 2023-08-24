import "./Menu.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type ExtendedProps,
  type IconData,
  renderAsChild,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from "react";

import { Icon } from "../icon";
import { luCheck, luChevronRight, luCircle } from "../icons";
import { MenuProvider, useMenuContext } from "./context";

const styles = scopedStyles("Menu");

// menu
// ----

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useMenuStore,
  "Menu"
);

/**
 * A dropdown menu.
 *
 * @example
 *
 * ```tsx
 * <Menu>
 *   <Menu.Button>
 *     <Button>Open menu</Button>
 *   </Menu.Button>
 *   <Menu.Popover>
 *     <Menu.Item onClick={firstAction}>Item 1</Menu.Item>
 *     <Menu.Item onClick={secondAction}>Item 2</Menu.Item>
 *   </Menu.Popover>
 * </Menu>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // groups and separators
 * <Menu>
 *   ...
 *   <Menu.Popover>
 *     <Menu.Group>
 *       <Menu.Item>Item 1</Menu.Item>
 *       <Menu.Item>Item 2</Menu.Item>
 *     </Menu.Group>
 *     <Menu.Separator />
 *     <Menu.Group>
 *       <Menu.Item>Item A</Menu.Item>
 *       <Menu.Item>Item B</Menu.Item>
 *     </Menu.Group>
 *   </Menu.Popover>
 * </Menu>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // heading
 * <Menu>
 *   ...
 *   <Menu.Popover>
 *     <Menu.Heading>My account</Menu.Heading>
 *     <Menu.Item>Profile</Menu.Item>
 *     <Menu.Item>Settings</Menu.Item>
 *   </Menu.Popover>
 * </Menu>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // submenu
 * <Menu>
 *   ...
 *   <Menu.Popover>
 *     <Menu.Item>Item 1</Menu.Item>
 *     <Menu.Item>Item 2</Menu.Item>
 *     <Menu>
 *       <Menu.ItemSubmenu>Open submenu</Menu.ItemSubmenu>
 *       <Menu.Popover>
 *         <Menu.Item>Subitem 1</Menu.Item>
 *         <Menu.Item>Subitem 2</Menu.Item>
 *       </Menu.Popover>
 *     </Menu>
 *   </Menu.Popover>
 * </Menu>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // radio and checkbox
 * <Menu defaultValues={{ view: "default", watching: ["issues"] }}>
 *   ...
 *   <Menu.Popover>
 *     <Menu.ItemRadio name="view" value="compact">
 *       Compact
 *     </Menu.ItemRadio>
 *     <Menu.ItemRadio name="view" value="default">
 *       Default
 *     </Menu.ItemRadio>
 *     <Menu.ItemRadio name="view" value="comfortable">
 *       Comfortable
 *     </Menu.ItemRadio>
 *     <Menu.Separator />
 *     <Menu.ItemCheckbox name="watching" value="issues">
 *       Issues
 *     </Menu.ItemCheckbox>
 *     <Menu.ItemCheckbox name="watching" value="pull-requests">
 *       Pull requests
 *     </Menu.ItemCheckbox>
 *     <Menu.ItemCheckbox name="watching" value="releases">
 *       Releases
 *     </Menu.ItemCheckbox>
 *   </Menu.Popover>
 * </Menu>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // inset items/headings
 * <Menu>
 *   ...
 *   <Menu.Popover>
 *     <Menu.Heading inset>Menu heading</Menu.Heading>
 *     <Menu.Item inset>Item 1</Menu.Item>
 *     <Menu.Item inset>Item 2</Menu.Item>
 *   </Menu.Popover>
 * </Menu>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // inset popover/group (items/headings inside will be inset)
 * <Menu>
 *   ...
 *   <Menu.Popover inset>
 *     <Menu.Item>Item 1</Menu.Item>
 *     <Menu.Item>Item 2</Menu.Item>
 *   </Menu.Popover>
 * </Menu>;
 *
 * // or
 * <Menu>
 *   ...
 *   <Menu.Popover>
 *     <Menu.Group inset>
 *       <Menu.Item>Item 1</Menu.Item>
 *       <Menu.Item>Item 2</Menu.Item>
 *     </Menu.Group>
 *   </Menu.Popover>
 * </Menu>;
 * ```
 */
export const Menu: Component<MenuProps, Properties> = createComponent(
  (props) => {
    const nested = Boolean(useStoreContext(true));
    return (
      <MenuProvider value={{ nested }}>
        <Root {...useDefaultStoreProps()} {...props} />
      </MenuProvider>
    );
  }
);

/** `Menu` options. */
export type MenuOptions = {
  /** The Ariakit store. */
  store?: Ariakit.MenuStore;

  /** The children. */
  children?: React.ReactNode;
};

/** `Menu` props. */
export type MenuProps = ExtendedProps<Ariakit.MenuStoreProps, MenuOptions>;

// store
// -----

function useDefaultStoreProps() {
  const nested = Boolean(useStoreContext(true));
  return {
    animated: true,
    placement: !nested ? "bottom" : undefined,
  } satisfies Ariakit.MenuStoreProps;
}

function useStore(props?: Ariakit.MenuStoreProps) {
  return Ariakit.useMenuStore({ ...useDefaultStoreProps(), ...props });
}

Menu.useStore = useStore;
Menu.useStoreContext = useStoreContext;
interface Properties {
  /**
   * `Menu` Ariakit store hook. Extends
   * [`Ariakit.useMenuStore`](https://ariakit.org/reference/use-menu-store).
   *
   * @example
   *
   * ```tsx
   * const menuStore = Menu.useStore();
   * ```
   */
  useStore: typeof useStore;

  /**
   * `Menu` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const menuStore = Menu.useStoreContext();
   * ```
   */
  useStoreContext: typeof useStoreContext;
}

// button
// ------

const Button: Component<MenuButtonProps> = createComponent(
  ({ children, ...props }) => (
    <Ariakit.MenuButton
      render={renderAsChild(children, { componentName: "Menu.Button" })}
      store={useStoreContext()}
      {...props}
    />
  )
);

/** `MenuButton` props. */
export type MenuButtonProps = ExtendedProps<Ariakit.MenuButtonProps>;

Menu.Button = Button;
interface Properties {
  /**
   * A button that controls the visibility of the menu. The menu will be
   * anchored to it. Extends [`<Ariakit.MenuButton
   * />`](https://ariakit.org/reference/menu-button). Rendered as the passed
   * child.
   *
   * @example
   *
   * ```tsx
   * <Menu>
   *   <Menu.Button>
   *     <Button>Open menu</Button>
   *   </Menu.Button>
   *   ...
   * </Menu>;
   * ```
   */
  Button: typeof Button;
}

// popover
// -------

const DEFAULT_POPOVER_PROPS = {
  gutter: 4,
} satisfies Partial<MenuPopoverProps>;

const Popover: Component<MenuPopoverProps> = createComponent(
  ({
    gutter = DEFAULT_POPOVER_PROPS.gutter,
    inset = false, // "reset" the context
    children,
    ...props
  }) => {
    const store = props.store ?? useStoreContext();
    const mounted = store.useState("mounted");
    const placement = store.useState("placement");
    const side = placement.split("-")[0];
    const { nested, inMenuBar, systemStyles } = useMenuContext();
    return (
      <MenuProvider value={{ inset }}>
        {mounted ? (
          <Ariakit.Menu
            portal
            store={useStoreContext()}
            data-side={side}
            data-system-style={systemStyles ? "" : undefined}
            data-nested={nested ? "" : undefined}
            gutter={nested ? 0 : inMenuBar ? 8 : gutter}
            {...props}
            className={clsx(styles.popover, props.className)}
          >
            {children}
          </Ariakit.Menu>
        ) : null}
      </MenuProvider>
    );
  }
);

/** `Menu.Popover` options. */
export type MenuPopoverOptions = {
  /** Adds an inset padding to child items and headings. */
  inset?: boolean;
};

/** `Menu.Popover` props. */
export type MenuPopoverProps = ExtendedProps<
  Ariakit.MenuProps,
  MenuPopoverOptions
>;

Menu.Popover = Popover;
interface Properties {
  /**
   * The menu popover. Rendered as `<div />`. Extends [`<Ariakit.Menu
   * />`](https://ariakit.org/reference/menu). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Menu>
   *   <Menu.Popover>
   *     <Menu.Item>Item 1</Menu.Item>
   *     <Menu.Item>Item 2</Menu.Item>
   *   </Menu.Popover>
   * </Menu>;
   * ```
   */
  Popover: typeof Popover;
}

// heading
// -------

const Heading: Component<MenuHeadingProps> = createComponent(
  ({ inset, ...props }) => {
    const { inset: contextInset } = useMenuContext();
    return (
      <Ariakit.MenuHeading
        store={useStoreContext()}
        data-inset={inset ?? contextInset ? "" : undefined}
        {...props}
        className={clsx(styles.heading, props.className)}
      />
    );
  }
);

/** `Menu.Heading` options. */
export type MenuHeadingOptions = {
  /** Adds an inset padding to the heading. */
  inset?: boolean;
};

Menu.Heading = Heading;
interface Properties {
  /**
   * A heading for the menu. Extends [`<Ariakit.MenuHeading
   * />`](https://ariakit.org/reference/menu-heading). Rendered as `<h1 />`.
   *
   * @example
   *
   * ```tsx
   * <Menu.Popover>
   *   <Menu.Heading>My account</Menu.Heading>
   *   ...
   * </Menu.Popover>;
   * ```
   */
  Heading: typeof Heading;
}

/** `Menu.Heading` props. */
export type MenuHeadingProps = ExtendedProps<
  Ariakit.MenuHeadingProps,
  MenuHeadingOptions
>;

// group
// -----

const Group: Component<MenuGroupProps> = createComponent(
  ({ inset, ...props }) => (
    <MenuProvider value={{ inset }}>
      <Ariakit.MenuGroup {...props} />
    </MenuProvider>
  )
);

/** `Menu.Group` options. */
export type MenuGroupOptions = {
  /** Adds an inset padding to child items and headings. */
  inset?: boolean;
};

/** `Menu.Group` props. */
export type MenuGroupProps = ExtendedProps<
  Ariakit.MenuGroupProps,
  MenuGroupOptions
>;

Menu.Group = Group;
interface Properties {
  /**
   * A group of menu items. Rendered as `<div />`. Extends [`<Ariakit.MenuGroup
   * />`](https://ariakit.org/reference/menu-group). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Menu.Popover>
   *   <Menu.Group>
   *     <Menu.Item>Item 1</Menu.Item>
   *     <Menu.Item>Item 2</Menu.Item>
   *   </Menu.Group>
   *   ...
   * </Menu.Popover>;
   * ```
   */
  Group: typeof Group;
}

// item
// ----

const ItemBase = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div"> & {
    leadingContent?: ReactNode;
    trailingContent?: ReactNode;
    inset?: boolean;
  }
>(({ inset, leadingContent, trailingContent, children, ...props }, ref) => (
  <div
    ref={ref}
    data-inset={inset ? "" : undefined}
    {...props}
    className={clsx(styles.item, props.className)}
  >
    {leadingContent && <span>{leadingContent}</span>}
    <span className={styles.content}>{children}</span>
    {trailingContent && <span>{trailingContent}</span>}
  </div>
));

const Item: Component<MenuItemProps> = createComponent(
  ({ icon, inset, shortcut, ...props }) => {
    const { inset: contextInset } = useMenuContext();
    return (
      <Ariakit.MenuItem
        render={
          <ItemBase
            inset={!icon && (inset ?? contextInset)}
            leadingContent={
              icon && <Icon className={styles.icon} icon={icon} />
            }
            trailingContent={
              shortcut && <span className={styles.shortcut}>{shortcut}</span>
            }
          />
        }
        {...props}
      />
    );
  }
);

/** `Menu.Item` options. */
export type MenuItemOptions = {
  /** An icon displayed before the item's content. */
  icon?: IconData;

  /** A shortcut displayed after the item's content. */
  shortcut?: ReactNode;

  /** Adds an inset padding to the item. */
  inset?: boolean;
};

/** `Menu.Item` props. */
export type MenuItemProps = ExtendedProps<
  Ariakit.MenuItemProps,
  MenuItemOptions
>;

Menu.Item = Item;
interface Properties {
  /**
   * A menu item. Rendered as `<div />`. Extends [`<Ariakit.MenuItem
   * />`](https://ariakit.org/reference/menu-item). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Menu.Popover>
   *   <Menu.Item>Item 1</Menu.Item>
   *   <Menu.Item>Item 2</Menu.Item>
   * </Menu.Popover>;
   * ```
   */
  Item: typeof Item;
}

// item radio
// ----------

function isRadioItemSelected(
  store: Ariakit.MenuStore,
  { name, value }: Pick<Ariakit.MenuItemRadioProps, "name" | "value">
) {
  const values = store.useState("values");
  return values[name] === value;
}

const ItemRadio: Component<MenuItemRadioProps> = createComponent(
  ({ shortcut, ...props }) => {
    const store = props.store ?? useStoreContext();
    const selected = isRadioItemSelected(store, props);
    return (
      <Ariakit.MenuItemRadio
        render={
          <ItemBase
            inset={!selected}
            leadingContent={
              selected && (
                <span className={styles.check}>
                  <Icon icon={luCircle} />
                </span>
              )
            }
            trailingContent={
              shortcut && <span className={styles.shortcut}>{shortcut}</span>
            }
          />
        }
        {...props}
      />
    );
  }
);

/** `Menu.ItemRadio` options. */
export type MenuItemRadioOptions = {
  /** A shortcut displayed after the item's content. */
  shortcut?: ReactNode;

  /** Adds an inset padding to the item. */
  inset?: boolean;
};

/** `Menu.ItemRadio` props. */
export type MenuItemRadioProps = ExtendedProps<
  Ariakit.MenuItemRadioProps,
  MenuItemRadioOptions
>;

Menu.ItemRadio = ItemRadio;
interface Properties {
  /**
   * A radio menu item. Rendered as `<div />`. Extends [`<Ariakit.MenuItemRadio
   * />`(https://ariakit.org/reference/menu-item-radio). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Menu.Popover>
   *   <Menu.ItemRadio name="view" value="compact">
   *     Compact
   *   </Menu.ItemRadio>
   *   <Menu.ItemRadio name="view" value="default">
   *     Default
   *   </Menu.ItemRadio>
   *   <Menu.ItemRadio name="view" value="comfortable">
   *     Comfortable
   *   </Menu.ItemRadio>
   * </Menu.Popover>;
   * ```
   */
  ItemRadio: typeof ItemRadio;
}

// item checkbox
// -------------

function isCheckboxItemSelected(
  store: Ariakit.MenuStore,
  { name, value }: Pick<Ariakit.MenuItemCheckboxProps, "name" | "value">
) {
  const values = store.useState("values");
  const itemValue = values[name];
  return (
    itemValue === true ||
    (value != null && itemValue === value) ||
    (Array.isArray(itemValue) && itemValue.includes(value as string | number))
  );
}

const ItemCheckbox: Component<MenuItemCheckboxProps> = createComponent(
  ({ shortcut, ...props }) => {
    const store = props.store ?? useStoreContext();
    const selected = isCheckboxItemSelected(store, props);
    return (
      <Ariakit.MenuItemCheckbox
        render={
          <ItemBase
            inset={!selected}
            leadingContent={
              selected && <Icon className={styles.icon} icon={luCheck} />
            }
            trailingContent={
              shortcut && <span className={styles.shortcut}>{shortcut}</span>
            }
          />
        }
        {...props}
      />
    );
  }
);

/** `Menu.ItemCheckbox` options. */
export type MenuItemCheckboxOptions = {
  /** A shortcut displayed after the item's content. */
  shortcut?: ReactNode;

  /** Adds an inset padding to the item. */
  inset?: boolean;
};

/** `Menu.ItemCheckbox` props. */
export type MenuItemCheckboxProps = ExtendedProps<
  Ariakit.MenuItemCheckboxProps,
  MenuItemCheckboxOptions
>;

Menu.ItemCheckbox = ItemCheckbox;
interface Properties {
  /**
   * A checkbox menu item. Rendered as `<div />`. Extends
   * [`<Ariakit.MenuItemCheckbox
   * />`](https://ariakit.org/reference/menu-item-checkbox). Rendered as `<div
   * />`.
   *
   * @example
   *
   * ```tsx
   * <Menu.Popover>
   *   <Menu.ItemCheckbox name="watching" value="issues">
   *     Issues
   *   </Menu.ItemCheckbox>
   *   <Menu.ItemCheckbox name="watching" value="pull-requests">
   *     Pull requests
   *   </Menu.ItemCheckbox>
   *   <Menu.ItemCheckbox name="watching" value="releases">
   *     Releases
   *   </Menu.ItemCheckbox>
   * </Menu.Popover>;
   * ```
   */
  ItemCheckbox: typeof ItemCheckbox;
}

// item submenu
// ------------

const ItemSubmenu: Component<MenuItemSubmenuProps> = createComponent(
  ({ icon, inset, children, ...props }) => {
    const { inset: contextInset } = useMenuContext();
    return (
      <Ariakit.MenuItem
        render={
          <Button>
            <ItemBase
              inset={!icon && (inset ?? contextInset)}
              leadingContent={
                icon && <Icon className={styles.icon} icon={icon} />
              }
              trailingContent={
                <Icon className={styles.icon} icon={luChevronRight} />
              }
            >
              {children}
            </ItemBase>
          </Button>
        }
        {...props}
      />
    );
  }
);

/** `Menu.ItemSubmenu` options. */
export type MenuItemSubmenuOptions = {
  /** An icon displayed before the item's content. */
  icon?: IconData;

  /** Adds an inset padding to the item. */
  inset?: boolean;
};

/** `Menu.ItemSubmenu` props. */
export type MenuItemSubmenuProps = ExtendedProps<
  Ariakit.MenuItemProps,
  MenuItemSubmenuOptions
>;

Menu.ItemSubmenu = ItemSubmenu;
interface Properties {
  /**
   * A menu item that triggers a submenu. Extends [`<Ariakit.MenuItem
   * />`](https://ariakit.org/reference/menu-item) (combined with
   * [`<Ariakit.MenuButton />`](https://ariakit.org/reference/menu-button)).
   * Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Menu>
   *   ...
   *   <Menu.Popover>
   *     ...
   *     <Menu>
   *       <Menu.ItemSubmenu>Open submenu</Menu.ItemSubmenu>
   *       <Menu.Popover>...</Menu.Popover>
   *     </Menu>
   *   </Menu.Popover>
   * </Menu>;
   * ```
   */
  ItemSubmenu: typeof ItemSubmenu;
}

// separator
// ---------

const Separator: Component<MenuSeparatorProps> = createComponent((props) => (
  <Ariakit.MenuSeparator
    store={useStoreContext()}
    {...props}
    className={clsx(styles.separator, props.className)}
  />
));

/** `Menu.Separator` props. */
export type MenuSeparatorProps = ExtendedProps<Ariakit.MenuSeparatorProps>;

Menu.Separator = Separator;
interface Properties {
  /**
   * A separator for menu items. Extends [`<Ariakit.MenuSeparator
   * />`](https://ariakit.org/reference/menu-separator). Rendered as `<hr />`.
   *
   * @example
   *
   * ```tsx
   * <Menu.Popover>
   *   <Menu.Item>Item 1</Menu.Item>
   *   <Menu.Separator />
   *   <Menu.Item>Item 2</Menu.Item>
   * </Menu.Popover>;
   * ```
   */
  Separator: typeof Separator;
}
