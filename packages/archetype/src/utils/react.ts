/* eslint-disable @typescript-eslint/no-explicit-any */

// mergeProps and useMergeRefs forked from the @ariakit/core and
// @ariakit/react-core packages - https://github.com/ariakit/ariakit/tree/main/packages

import {
  type HTMLAttributes,
  type MouseEvent,
  type MutableRefObject,
  type Ref,
  type RefCallback,
  type RefObject,
  useMemo,
  useState,
} from "react";

/** Any object. */
type AnyObject = Record<string, any>;

/** Checks whether `prop` is an own property of `obj` or not. */
function hasOwnProperty<T extends AnyObject>(
  object: T,
  prop: keyof any
): prop is keyof T {
  return Object.prototype.hasOwnProperty.call(object, prop);
}

/** Merges two sets of props. */
function internalMergeProps<T extends HTMLAttributes<any>>(
  base: T,
  overrides: T
) {
  const props = { ...base };

  for (const key in overrides) {
    if (!hasOwnProperty(overrides, key)) continue;

    if (key === "className") {
      const prop = "className";
      props[prop] = base[prop]
        ? `${base[prop]} ${overrides[prop]}`
        : overrides[prop];
      continue;
    }

    if (key === "style") {
      const prop = "style";
      props[prop] = base[prop]
        ? { ...base[prop], ...overrides[prop] }
        : overrides[prop];
      continue;
    }

    const overrideValue = overrides[key];

    if (typeof overrideValue === "function" && key.startsWith("on")) {
      const baseValue = base[key];
      if (typeof baseValue === "function") {
        type EventKey = Extract<keyof HTMLAttributes<any>, `on${string}`>;
        props[key as EventKey] = (...args) => {
          overrideValue(...args);
          baseValue(...args);
        };
        continue;
      }
    }

    if (typeof overrideValue === "undefined" && key.startsWith("on")) continue;

    props[key] = overrideValue;
  }

  return props;
}

/** Merges multiple sets of props. */
export function mergeProps<T extends HTMLAttributes<any>>(
  ...sets: (T | undefined)[]
) {
  if (sets.length < 2) throw new Error("Expected two sets of props at least.");

  let props = sets[0] as T;
  sets.slice(1).forEach((set) => {
    if (!set) return;
    props = internalMergeProps(props, set);
  });
  return props;
}

/**
 * Splits a set of props depending on a list of keys. The keys array must be
 * typed with `as const` to get proper output types.
 *
 * @example
 *
 * ```tsx
 * const [extractedProps, rest] = splitProps(props, PROPS_TO_EXTRACT);
 * ```
 */
export function splitProps<
  Props extends Record<string, any>,
  Keys extends readonly string[]
>(
  props: Props,
  keys: Keys
): [
  extractedProps: Pick<Props, Extract<Keys[number], keyof Props>>,
  rest: Omit<Props, Keys[number]>
] {
  const extractedProps: any = {};
  const rest: any = {};

  Object.entries(props).forEach(([prop, value]) => {
    if (keys.includes(prop as Keys[number])) extractedProps[prop] = value;
    else rest[prop] = value;
  });

  return [extractedProps, rest];
}

/**
 * Extracts data attributes from a set of props.
 *
 * @example
 *
 * ```tsx
 * const [dataAttributes, rest] = splitDataAttributes(props);
 * ```
 */
export function splitDataAttributes<Props extends Record<string, any>>(
  props: Props
): [
  dataAttributes: Pick<Props, keyof Props & `data-${string}`>,
  rest: Omit<Props, keyof Props & `data-${string}`>
] {
  const dataAttributes: any = {};
  const rest: any = {};

  Object.entries(props).forEach(([prop, value]) => {
    if (prop.startsWith("data-")) dataAttributes[prop] = value;
    else rest[prop] = value;
  });

  return [dataAttributes, rest];
}

/** Sets both a function and object React ref. */
function setRef<T>(
  ref: RefCallback<T> | MutableRefObject<T> | null | undefined,
  value: T
) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

/**
 * Merges React Refs into a single memoized function ref so you can pass it to
 * an element.
 *
 * @example
 *
 * ```tsx
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 * ```
 */
export function useMergeRefs(...refs: Array<Ref<any> | undefined>) {
  return useMemo(() => {
    if (!refs.some(Boolean)) return undefined;
    return (value: unknown) => {
      refs.forEach((ref) => setRef(ref, value));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

/**
 * Creates a `click` event handler that forwards the click to a target input
 * element, similar to how a `<label />` element behaves.
 *
 * Useful when creating a hidden input element that is triggered by a visible
 * element (e.g. a custom checkbox).
 */
export function forwardInputClick(inputRef: RefObject<HTMLInputElement>) {
  return (event: MouseEvent) => {
    if (event.target === inputRef.current) return;
    queueMicrotask(() => {
      inputRef.current?.focus();
      inputRef.current?.click();
    });
  };
}

/** HTML `data-` attributes. */
export type DataAttributes = {
  [index: `data-${string}`]: unknown;
};

/** Holds and returns the initially passed value indefinitely. */
export function useStaticValue<T>(value: T | (() => T)) {
  const [staticValue] = useState(value);
  return staticValue;
}

/** Create a random id. The id will be 5 characters long. */
export function createId() {
  return Math.random().toString(36).substring(2, 7);
}

// TODO: replace with React 18 useId
/** Create a stable random id. The id will be 5 characters long. */
export function useId() {
  return useStaticValue(() => createId());
}
