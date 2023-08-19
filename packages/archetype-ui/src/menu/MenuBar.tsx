import "./MenuBar.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

import { MenuProvider } from "./context";
import { Menu } from "./Menu";

const styles = scopedStyles("MenuBar");

// menu bar
// --------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useMenuBarStore,
  "Menu"
);

// split into a different component in order to use the store context
const InternalMenuBar: Component<ExtendedProps<Ariakit.MenuBarProps>> =
  createComponent((props) => {
    return (
      <Ariakit.MenuBar
        store={useStoreContext()}
        {...props}
        className={clsx(styles.menubar, props.className)}
      />
    );
  });

/**
 * A menu bar. Compose it with menus to create a menu bar. Extends
 * [`<Ariakit.MenuBar />`](https://ariakit.org/reference/menu-bar). Rendered as
 * `<div />`.
 *
 * @example
 *
 * ```tsx
 * <MenuBar store={store}>
 *   <Menu>
 *     <MenuBar.Button>Menu 1</MenuBar.Button>
 *     <Menu.Popover>
 *       <Menu.Item>Item 1</Menu.Item>
 *       <Menu.Item>Item 2</Menu.Item>
 *     </Menu.Popover>
 *   </Menu>
 *   <Menu>
 *     <MenuBar.Button>Menu 2</MenuBar.Button>
 *     ...
 *   </Menu>
 *   <Menu>
 *     <MenuBar.Button>Menu 3</MenuBar.Button>
 *     ...
 *   </Menu>
 * </MenuBar>;
 * ```
 */
export const MenuBar: Component<MenuBarProps, Properties> = createComponent(
  ({ store, storeProps, ...props }) => (
    <MenuProvider value={{ systemStyles: true, inMenuBar: true }}>
      <Root store={store} {...storeProps}>
        <InternalMenuBar {...props} />
      </Root>
    </MenuProvider>
  )
);

/** `MenuBar` options. */
export type MenuBarOptions = {
  /** The Ariakit store. */
  store?: Ariakit.MenuBarStore;

  /** The Ariakit store props. */
  storeProps?: Omit<Ariakit.MenuBarStoreProps, "store">;
};

/** `MenuBar` props. */
export type MenuBarProps = ExtendedProps<Ariakit.MenuBarProps, MenuBarOptions>;

// store
// -----

MenuBar.useStore = Ariakit.useMenuBarStore;
MenuBar.useStoreContext = useStoreContext;
interface Properties {
  /**
   * `MenuBar` Ariakit store hook.
   *
   * @example
   *
   * ```tsx
   * const menuStore = MenuBar.useStore();
   * ```
   */
  useStore: typeof Ariakit.useMenuBarStore;

  /**
   * `MenuBar` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const menuStore = MenuBar.useStoreContext();
   * ```
   */
  useStoreContext: typeof useStoreContext;
}

// button
// ------

const Button: Component<MenuBarButtonProps> = createComponent(
  ({ children, ...props }) => (
    <Menu.Button {...props} className={clsx(styles.button, props.className)}>
      <Ariakit.MenuItem>{children}</Ariakit.MenuItem>
    </Menu.Button>
  )
);

/** `MenuBar.Button` props. */
export type MenuBarButtonProps = ExtendedProps<Ariakit.MenuButtonProps>;

MenuBar.Button = Button;
interface Properties {
  /**
   * A button that controls the visibility of the menu inside a menu bar. The
   * menu will be anchored to it. Extends [`<Ariakit.MenuButton
   * />`](https://ariakit.org/reference/menu-button) (combined with
   * [`<Ariakit.MenuItem />`](https://ariakit.org/reference/menu-item)).
   * Rendered as `<button />`.
   *
   * @example
   *
   * ```tsx
   * <MenuBar.Button>File</MenuBar.Button>;
   * ```
   */
  Button: typeof Button;
}
