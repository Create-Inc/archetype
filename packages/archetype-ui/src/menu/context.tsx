import { createContext, type ReactNode, useContext } from "react";

const DEFAULT_VALUE = {
  nested: false,
  systemStyles: false,
  inMenuBar: false,
  inset: false,
};

type MenuContextValue = typeof DEFAULT_VALUE;

export const MenuContext = createContext<MenuContextValue>(DEFAULT_VALUE);

function removeUndefined(object: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined)
  );
}

export function MenuProvider({
  value,
  children,
}: {
  value: Partial<MenuContextValue>;
  children?: ReactNode;
}) {
  const parentValue = useContext(MenuContext);
  return (
    <MenuContext.Provider
      value={{ ...DEFAULT_VALUE, ...parentValue, ...removeUndefined(value) }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  const value = useContext(MenuContext);
  if (!value) throw new Error("Menu context missing");
  return value;
}
