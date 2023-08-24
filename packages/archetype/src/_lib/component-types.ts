/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

// simple components
// -----------------

export type HTMLTag = keyof JSX.IntrinsicElements;

export type AriakitPropsToOmit = "as" | "wrapElement";
export type FixAriakitChildren<T> = T extends { children?: any }
  ? Omit<T, "children"> & { children?: React.ReactNode }
  : T;
export type FixAriakitStore<T> = T extends { store: infer S }
  ? Omit<T, "store"> & { store?: S }
  : T;
export type AriakitFixes<T> = Omit<
  FixAriakitStore<FixAriakitChildren<T>>,
  AriakitPropsToOmit
>;

/**
 * Extends a props type with additional options.
 *
 * If an HTML tag is provided, the corresponding HTML attributes will be used.
 *
 * @example
 *
 * ```tsx
 * type ButtonProps = ExtendedProps<"button", ButtonOptions>;
 * ```
 *
 * @template P The base props type or the HTML tag.
 * @template O The options to add.
 */
export type ExtendedProps<P, O = unknown> = P extends HTMLTag
  ? Omit<React.ComponentPropsWithRef<P>, keyof O> & O
  : Omit<AriakitFixes<P>, keyof O> & O;

/**
 * A component.
 *
 * @example
 *
 * ```tsx
 * type ButtonComponent = Component<ButtonProps>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // generic component
 * type SelectComponent = Component<
 *   <T extends Value = Value>(props: SelectProps<T>) => ReactElement | null
 * >;
 * ```
 *
 * @example
 *
 * ```tsx
 * // component with properties (e.g. compound component)
 * type MenuComponent = Component<MenuProps, Properties>;
 *
 * interface Properties {
 *   Popover: MenuPopoverComponent;
 * }
 * ```
 *
 * @template P Props or a function component type (useful for creating generic
 *   components).
 * @template S Optional component properties (e.g. for compound components).
 */
export type Component<P, S = unknown> = (P extends Function
  ? P
  : { (props: P): React.ReactElement | null }) & { displayName?: string } & S;

// polymorphic components
// ----------------------

/**
 * A "polymorphic spec", which is an object type with a `default` and optional
 * properties for possible `as` values. Their values can be HTML tags or prop
 * types.
 *
 * @example
 *
 * ```tsx
 * type ButtonAs = { default: "button"; button: "button"; a: LinkProps };
 * ```
 */
export type PolymorphicSpec = { default: any } & Partial<
  Record<HTMLTag, unknown>
>;

/**
 * Keys of a polymorphic spec (without `default`).
 *
 * @example
 *
 * ```tsx
 * type ButtonAs = { default: "button"; button: "button"; a: LinkProps };
 * type ButtonAsKeys = PolymorphicSpecKeys<ButtonAs>; // "button" | "a"
 * ```
 *
 * @template S The polymorphic spec.
 */
export type PolymorphicSpecKeys<S extends PolymorphicSpec> = Exclude<
  keyof S,
  "default"
>;

/**
 * The default of a polymorphic spec.
 *
 * @example
 *
 * ```tsx
 * type ButtonAs = { default: "button"; button: "button"; a: LinkProps };
 * type ButtonAsDefault = PolymorphicSpecKeys<ButtonAs>; // "button"
 * ```
 *
 * @template S The polymorphic spec.
 */
export type PolymorphicSpecDefault<S extends PolymorphicSpec> = S["default"];

/**
 * Props of a polymorphic component.
 *
 * Takes a "polymorphic spec", which is an object type with a `default` and
 * optional properties for possible `as` values. Their values can be HTML tags
 * or prop types.
 *
 * @example
 *
 * ```tsx
 * type ButtonAs = { default: "button"; button: "button"; a: LinkProps };
 * type ButtonProps<As extends "button" | "a" = "button"> =
 *   PolymorphicProps<ButtonAs, As, ButtonOptions>;
 * ```
 *
 * @template S The polymorphic spec.
 * @template As The element that the component will be rendered as.
 * @template O Options to be added to the props.
 */
export type PolymorphicProps<
  S extends PolymorphicSpec,
  As extends PolymorphicSpecKeys<S> = PolymorphicSpecKeys<S>,
  O = unknown
> = {
  [E in keyof S]: ExtendedProps<S[As], O>;
}[As];

// These private types are used to provide better type compatibility in
// the render function of `createPolymorphicComponent()`.

export type GenericExtendedProps<P, O = unknown> = P extends HTMLTag
  ? Omit<React.HTMLAttributes<any>, keyof O> & O
  : Omit<AriakitFixes<P>, keyof O | keyof React.HTMLAttributes<any>> &
      O &
      React.HTMLAttributes<any>;

export type GenericPolymorphicProps<S extends PolymorphicSpec, O = unknown> = {
  [E in PolymorphicSpecKeys<S>]: GenericExtendedProps<
    S[PolymorphicSpecKeys<S>],
    O
  >;
}[PolymorphicSpecKeys<S>] & { ref?: React.Ref<any> };

/**
 * A polymorphic component.
 *
 * Takes a "polymorphic spec", which is an object type with a `default` and
 * optional properties for possible `as` values. Their values can be HTML tags
 * or prop types.
 *
 * @example
 *
 * ```tsx
 * type ButtonAs = { default: "button"; button: "button"; a: LinkProps };
 * type ButtonProps<As extends "button" | "a" = "button"> =
 *   PolymorphicProps<ButtonAs, ButtonOptions, As>;
 * ```
 *
 * @template S The polymorphic spec.
 * @template O Options to be added to the props.
 */
export interface PolymorphicComponent<S extends PolymorphicSpec, O = unknown> {
  <As extends PolymorphicSpecKeys<S> = PolymorphicSpecDefault<S>>(
    props: { as?: As } & {
      [E in PolymorphicSpecKeys<S>]: ExtendedProps<S[As], O>;
    }[As]
  ): React.ReactElement | null;
  displayName?: string;
}
