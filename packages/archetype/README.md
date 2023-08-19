# Archetype

A design system _system_.

## Building an archetype component

### Styles

1. Create the stylesheet as `ComponentName.scoped.css`.
2. Import it in the component file (`ComponentName.tsx`):

   ```tsx
   import "./ComponentName.scoped.css";
   ```

3. Create the `styles` object:

   ```tsx
   const styles = scopedStyles("ComponentName");
   ```

4. All classes are scoped by default. Use `styles.nameOfTheClass` to use them, e.g.:

   ```tsx
   <div className={styles.avatar} />
   ```

5. Classes that start with underscore (e.g. `._variant-primary`) are unscoped, use them directly:

   ```tsx
   <div className="variant-primary" />
   ```

   Note that the underscore is removed.

### Types and creating the component

There are two types of components: simple and polymorphic.

Simple components render a specific HTML element consistently (e.g. `div`).

Polymorphic components can be rendered as different elements depending on the value of the `as` prop (e.g. `button` or `a`).

For both simple and polymorphic, create an "options" type with any props you want to add:

```tsx
/** `Avatar` options. */
export type AvatarOptions = {
  /** Show a status indicator. */
  status?: "green" | "yellow" | "red";
};
```

Then, create the props type with `ExtendedProps` or `PolymorphicProps`. Archetype components always extend from either an HTML element or a different component (such as an Ariakit component or an Archetype primitive).

**For simple components:**

```tsx
// extend from an HTML element

/** `Button` props. */
export type ButtonProps = ExtendedProps<"button", ButtonOptions>;

// or extend from another component

/** `Button` props. */
export type ButtonProps = ExtendedProps<AriakitButtonProps, ButtonOptions>;
```

To create a component that uses these props, use `createComponent` and annotate the type with `Component`:

````tsx
/**
 * An icon. Extends `<AtIcon />`. Rendered as `<svg />`.
 *
 * @example
 *
 * ```tsx
 * <Icon icon={checkmark} />;
 * ```
 */
export const Icon: Component<IconProps> = createComponent((props) => {
  return <>...</>;
});
````

**For polymorphic components:**

First, create a "spec" type that defines a default `as` value and maps `as` values to the base component props:

```tsx
/** `Avatar` polymorphic spec. */
export type AvatarAs = {
  default: "div"; // define the default `as` value

  // base props can be from plain HTML elements
  div: "div";

  // or from other components
  button: AtAvatarProps<"button">;
  a: AtAvatarProps<"a">;
};
```

Then create the props type with `PolymorphicProps`. Note that the `As` type has to be generic for proper type-checking:

```tsx
/** `Avatar` props. */
export type AvatarProps<As extends "div" | "button" | "a" = "div"> =
  PolymorphicProps<AvatarAs, As, AvatarOptions>;
```

To create the component, use `createPolymorphicComponent` and annotate it with `PolymorphicComponent`. Pass it the "polymorphic spec" type and the **options** type (not the props type!):

````tsx
/**
 * An avatar that displays a picture or the initials of a person or entity.
 * Extends `<AtAvatar />`.
 *
 * Use the `as` prop to render as:
 *
 * - `"div"` (default) - `<div />`
 * - `"button"`- Ariakit: `<Button as="button" />`
 * - `"a"` - Ariakit: `<Button as="a" />`
 *
 * @example
 *
 * ```tsx
 *   <Avatar name="Dani Guardiola" image="https://dio.la/me.png" />
 *   ```;
 * ```
 */
export const Avatar: PolymorphicComponent<AvatarAs, AvatarOptions> =
  createPolymorphicComponent(({ as = "div", ...props }) => {
    return <>...</>;
  });
````

In some cases, you might not have any props to add as options. When that happens, simply don't create the options type and omit it in all places where you would normally pass it (`ExtendedProps`, `PolymorphicProps`, `createComponent`, `createPolymorphicComponent`).

### Default props

To define default props, use `satisfies` to create an object:

```tsx
const DEFAULT_PROPS = {
  fallbackDelay: 1000,
} satisfies Partial<AvatarOptions>;
```

Then, use it when destructuring props:

```tsx
export const AtAvatar = createPolymorphicComponent<AtAvatarAs, AtAvatarOptions>(
  ({
    as = "div",
    fallbackDelay = DEFAULT_PROPS.fallbackDelay,
    image,
    ...props
  }) => {
    /* ... */
  }
);
```
