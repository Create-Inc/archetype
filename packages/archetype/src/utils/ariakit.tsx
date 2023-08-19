/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  cloneElement,
  createContext,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  useContext,
  useState,
} from "react";

import { mergeProps } from "./react";

/**
 * Creates a context previder and consumer hook for an Ariakit store, for use in
 * "tree components".
 */
export function createAriakitStoreContext<Store>(componentName: string) {
  const ComboboxStoreContext = createContext<Store | undefined>(undefined);

  const StoreProvider = ComboboxStoreContext.Provider;

  function useStoreContext(optional?: false): Store;
  function useStoreContext(optional: true): Store | undefined;
  function useStoreContext(optional = false) {
    const store = useContext(ComboboxStoreContext);
    if (!optional && !store)
      throw new Error(`${componentName}: store context missing.`);
    return store;
  }

  return { StoreProvider, useStoreContext };
}

export function createAriakitRoot<Store, StoreProps>(
  useStoreHook: (props?: StoreProps) => Store,
  componentName: string
) {
  const { StoreProvider, useStoreContext } =
    createAriakitStoreContext<Store>(componentName);

  function Root({
    store,
    children,
    ...props
  }: StoreProps & {
    store?: Store;
    children?: React.ReactNode;
  }) {
    return (
      <StoreProvider
        value={useAriakitStore(useStoreHook, store, props as StoreProps)}
      >
        {children}
      </StoreProvider>
    );
  }

  return { Root, useStoreContext };
}

/**
 * Returns an Ariakit component store, or creates a new one if none is provided
 * with the props that have been passed.
 *
 * If the presence of a store changes during runtime, an error is thrown.
 */
export function useAriakitStore<Store, StoreProps>(
  useStore: (props?: StoreProps) => Store,
  store: Store | undefined,
  props?: StoreProps
) {
  useStoreError(store);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return store ?? useStore(props);
}

function useStoreError(store?: unknown) {
  const isSet = Boolean(store);
  const [isInitiallySet] = useState(isSet);
  if (isSet !== isInitiallySet)
    throw new Error(
      "An Ariakit store has been added or removed from the context on runtime, which is not allowed."
    );
}

export type RenderProp<
  P = React.HTMLAttributes<any> & React.RefAttributes<any>
> = (props: P) => React.ReactNode;

export function renderAsChild(
  children: any,
  options?: {
    optional?: false;
    componentName?: string;
    excludeProps?: string[];
  }
): ReactElement | RenderProp;

export function renderAsChild(
  children: any,
  options?: { optional: true; componentName?: string; excludeProps?: string[] }
): ReactElement | RenderProp | undefined;

/**
 * Validates that the `children` passed is a single React element, so that it
 * can be passed to an Ariakit component's `render` prop.
 *
 * By default, it throws an error if invalid. If `optional` is `true`, it
 * returns `undefined` instead.
 *
 * Props from Ariakit can be excluded with the `excludeProps` option.
 */
export function renderAsChild(
  children: any,
  options: {
    optional?: boolean;
    componentName?: string;
    excludeProps?: string[];
  } = {}
): ReactElement | RenderProp | undefined {
  if (!isValidElement(children)) {
    if (options.optional) return undefined;
    if (children !== undefined)
      throw new Error(
        `${
          options.componentName ? `${options.componentName}: ` : ""
        }\`children\` must be a react element`
      );
  }

  if (!isValidElement<HTMLAttributes<unknown>>(children)) return undefined;

  if (options.excludeProps) {
    return (props) => {
      const filteredProps = Object.fromEntries(
        Object.entries(props).filter(
          ([key]) => !options.excludeProps?.includes(key)
        )
      );
      return cloneElement(children, mergeProps(filteredProps, children.props));
    };
  }

  return children;
}
