import type * as Ariakit from "@ariakit/react";
import {
  type Component,
  createComponent,
  type ExtendedProps,
} from "@createinc/archetype";
import { type MouseEvent, useState } from "react";

import { MenuProvider } from "./context";
import { Menu, type MenuProps } from "./Menu";

export const ContextMenu: Component<ContextMenuProps, Properties> =
  createComponent((props) => {
    return (
      <MenuProvider value={{ systemStyles: true }}>
        <Menu {...useDefaultStoreProps()} {...props} />
      </MenuProvider>
    );
  });

/** `ContextMenu` props. */
export type ContextMenuProps = ExtendedProps<MenuProps>;

/**
 * A context menu, typically opened by right-clicking an element. Use it as a
 * replacement for `<Menu />`. Extends `<Menu />`.
 *
 * To use it, create a store and use the `useContextMenu` utility to obtain
 * props for the target element and the menu popover. There can be multiple
 * targets: simply spread `targetProps` to all of them.
 *
 * ```tsx
 * const contextMenu = ContextMenu.useStore();
 * const { targetProps, menuPopoverProps } =
 *   ContextMenu.useContextMenu(contextMenu);
 * <>
 *   <div {...targetProps}>Right click here...</div>
 *   <ContextMenu store={contextMenu}>
 *     <Menu.Popover {...menuPopoverProps}>
 *       <Menu.Item>Item 1</Menu.Item>
 *       <Menu.Item>Item 2</Menu.Item>
 *     </Menu.Popover>
 *   </ContextMenu>
 * </>;
 * ```
 */

// store
// -----

function useDefaultStoreProps() {
  const nested = Boolean(Menu.useStoreContext(true));
  return {
    placement: !nested ? "bottom-start" : undefined,
  } as const; // satisfies Ariakit.MenuStoreProps
}

function useStore(props?: Ariakit.MenuStoreProps) {
  return Menu.useStore({ ...useDefaultStoreProps(), ...props });
}

ContextMenu.useStore = useStore;
ContextMenu.useStoreContext = Menu.useStoreContext;
interface Properties {
  /**
   * `Menu` Ariakit store hook for `ContextMenu`.
   *
   * @example
   *
   * ```tsx
   * const contextMenuStore = ContextMenu.useStore();
   * ```
   */
  useStore: typeof useStore;

  /**
   * `Menu` Ariakit store context consumer for `ContextMenu`.
   *
   * @example
   *
   * ```tsx
   * const contextMenuStore = ContextMenu.useStoreContext();
   * ```
   */
  useStoreContext: typeof Menu.useStoreContext;
}

// context menu handler
// --------------------

function useContextMenu(store: Ariakit.MenuStore) {
  const [anchorRect, setAnchorRect] = useState({ x: 0, y: 0 });

  const onContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setAnchorRect({ x: event.clientX, y: event.clientY });
    store.show();
  };
  const targetProps = { onContextMenu };

  const getAnchorRect = () => anchorRect;
  const menuPopoverProps = { getAnchorRect, modal: true };

  return { targetProps, menuPopoverProps };
}

ContextMenu.useContextMenu = useContextMenu;
interface Properties {
  /**
   * Utility to create a context menu.
   *
   * @example
   *
   * ```tsx
   * const contextMenu = ContextMenu.useStore();
   * const { targetProps, menuPopoverProps } =
   *   ContextMenu.useContextMenu(contextMenu);
   * <>
   *   <div {...targetProps}>Right click here...</div>
   *   <ContextMenu store={contextMenu}>
   *     <Menu.Popover {...menuPopoverProps}>...</Menu.Popover>
   *   </ContextMenu>
   * </>;
   * ```
   */
  useContextMenu: typeof useContextMenu;
}
