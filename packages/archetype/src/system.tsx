/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";

import {
  type Component,
  type ExtendedProps,
  type GenericPolymorphicProps,
  type PolymorphicComponent,
  type PolymorphicProps,
  type PolymorphicSpec,
  type PolymorphicSpecKeys,
} from "./_lib/component-types";

export type {
  Component,
  ExtendedProps,
  PolymorphicComponent,
  PolymorphicProps,
};

/**
 * Creates a type-safe component. The ref is forwarded and automatically
 * included in the props of the render function.
 *
 * @example
 *
 * ```tsx
 * const Button: Component<Props> = createComponent((props) => {
 *   return <button {...props} />;
 * });
 *
 * <Button />;
 * ```
 *
 * @template P Props.
 * @template S Optional component properties (e.g. for compound components).
 */
export function createComponent<P, S>(
  render: (props: P) => React.ReactElement | null
): Component<P, S> {
  // forward ref
  const Component = forwardRef((props, ref) =>
    (render as any)({ ref, ...props })
  );
  // cast to component type (through return type)
  return Component as any;
}

/**
 * Creates a type-safe polymorphic component with the `as` prop. The ref is
 * forwarded and automatically included in the props of the render function.
 *
 * To achieve polymorphic types, it takes a "polymorphic spec", which is an
 * object type with a `default` property and properties for possible `as`
 * values. Their values can be HTML tags or prop types.
 *
 * @example
 *
 * ```tsx
 * type ButtonAs = { default: "button"; button: "button"; a: LinkProps };
 *
 * const Button: PolymorphicComponent<ButtonAs, ButtonOptions> =
 *   createPolymorphicComponent(({ as: Element = "button", ...props }) => {
 *     return <Element {...props} />;
 *   });
 *
 * <Button as="a" href="https://dio.la/" />;
 * ```
 *
 * @template S The polymorphic spec.
 * @template O Options to be added to the props.
 */
export function createPolymorphicComponent<
  S extends PolymorphicSpec,
  O = unknown
>(
  render: (
    props: GenericPolymorphicProps<S, O> & { as?: PolymorphicSpecKeys<S> }
  ) => React.ReactElement | null
): PolymorphicComponent<S, O> {
  // cast to component type (through ArchetypeSystemOutput)
  return createComponent(render) as any;
}

const DEFAULT_PREFIX = "at";

/**
 * Creates a proxy object that automatically scopes CSS classes.
 *
 * @example
 *
 * ```tsx
 * const styles = scopedStyles("Button");
 * <button className={styles.button} />;
 * ```
 */
export function scopedStyles(
  scope: string,
  prefix = DEFAULT_PREFIX
): Record<string, string> {
  const styles: Record<string, string> = new Proxy(
    {},
    {
      get(_, key) {
        if (typeof key === "symbol") throw new Error("unsupported");
        return `${prefix}_${scope}_${key}`;
      },
    }
  );
  return styles;
}
