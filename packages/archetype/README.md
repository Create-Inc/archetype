# Archetype

The design system **system**.

> Archetype is an opinionated design system stack. [Learn more](https://TODO/)

---

This package is the core of Archetype, and contains three main parts:

- **Core TypeScript and React utilities and types** to build your design system and its components. This `README` focuses on this part.
- **Scope PostCSS plugin**, used to style Archetype components with scoped classes and leveraging CSS Cascade Layers for overridability. [Learn more](./scope/README.md).
- **Better states PostCSS plugin**, used by Archetype component styles to achieve better CSS states with easy. [Learn more](./better-states/README.md).

## Tokens

Archetype provides a design token system that is built on top of Tailwind and provides strong type-safety and ergonomic features.

To get started, create tokens of various types with `createArchetypeTokens(<type>, <tokens)`.

For example, here's how you can create color tokens:

```tsx
export const colors = createArchetypeTokens("colors", {
  primary: "hsl(222.2 47.4% 11.2%)",
});
```

Then, create the global tokens object:

```tsx
export const tokens = createArchetypeTokens("all", {
  colors,
  typography,
});
```

You can use the tokens object directly if you wish, but it is recommended to configure Tailwind CSS with them and use it instead.

You can use `withArchetypeTailwind(<config>)` to create a Tailwind configuration helper. This utility also allows specifying both base styles and custom Tailwind configurations for more advanced use cases:

```tsx
export const withTokens = withArchetypeTailwind({
  tokens,
  baseStyles: (theme) => ({
    body: { backgroundColor: theme("colors.background") },
  }),
  tailwindConfig: { plugins: [tailwindcssAnimate] },
});
```

Finally, the `withTokens` function can be used to create a Tailwind configuration that is pre-loaded with your design tokens. Use it in the Tailwind configuration file of your project:

```tsx
export default withTokens({
  content: [
    // ...
  ],
  // project-specific Tailwind configuration...
});
```

## Component-specific utilities

Archetype exports a few utilities that help you build specific components. They have been created with composition and customization in mind.

For example, the `useAvatar` utility handles a lot of typical avatar features for you, like:

- Tracking the image loading state as well as the overall avatar state, indicating whether it should show the image, initials, or a fallback at any given time.
- Computing the initials from the name if not provided.
- Picking a background color for displaying initials, using a deterministic algorithm.

It's simple to use:

```tsx
// in your Avatar component
const { avatarState, computedInitials, initialsColor } = useAvatar({
  name,
  initials,
  image,
  initialsColorOptions,
});

// you can then use these values to render the avatar UI, e.g.
if (avatarState === "initials") color = initialsColor;

avatarState === "fallback" ? <Icon icon={fallbackIcon} /> : null;

<span>{computedInitials}</span>;
```

## Building components

Archetype simplifies many common design system challenges through a structured and consistent way of authoring design system components. This is supported by a robust set of utilities, tools, and types.

Here's an incomplete list of challenges addressed by Archetype:

- Polymorphism (the `as` prop).
- Ref forwarding and typing.
- "Compound" components, a.k.a. components with sub-components.
- Style scoping and overridability.
- Extending third-party UI primitives and components.
- Organization and documentation.

Let's learn how to author a component using Archetype.

### Styles

> 🛈 Styles are meant to be authored with the help of the **Scope** and **Better states** PostCSS plugins.

1. Create the stylesheet as `ComponentName.scoped.css`.
2. Import it in the component file (`ComponentName.tsx`):

   ```tsx
   import "./ComponentName.scoped.css";
   ```

3. Create the `styles` object using `scopedStyles`:

   ```tsx
   const styles = scopedStyles("ComponentName");
   ```

4. All classes are scoped by default. Use `styles.nameOfTheClass` to reference them, e.g.:

   ```tsx
   <div className={styles.avatar} />
   ```

5. Classes that start with underscore (e.g. `._my-class`) are unscoped (a.k.a. "global"), use them directly:

   ```tsx
   <div className="my-class" />
   ```

   Note that the underscore is removed.

   > 🛈 Using unscoped classes is only intended as a escape hatch (e.g. a class from a third party library that you have no control over).
   >
   > If class scoping gets in the way, try other strategies like targeting `data-` attributes before resorting to unscoped classes.

> **TODO:** Archetype styling guidelines.

### Typing and creating the component

There are two types of components: simple and polymorphic.

Simple components render a specific HTML element consistently (e.g. `div`). This is the most common type of component.

Polymorphic components can be rendered as different elements depending on the value of the `as` prop (e.g. `button` or `a`).

**Component options**

For both simple and polymorphic components, create an "options" type with any props you want to add:

```tsx
/** `Button` options. */
export type ButtonOptions = {
  /**
   * The button's visual appearance.
   *
   * @default "primary"
   */
  variant?:
    | "primary"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};
```

> 🛈 Archetype design systems make a disctinction between "options" and "props".
>
> - Options: design-system-specific props like `variant`, `size`, etc.
> - Props: all props including options, e.g. the `<button />` `onClick` prop.

**Component props**

You can create the props type with `ExtendedProps` or `PolymorphicProps`.

> 🛈 Archetype components always "extend" from either an HTML element or a different component, like a UI primitive from [Ariakit](https://ariakit.org/), [Radix](https://radix-ui.com/), etc.
>
> This means that the component will accept all props from component it's extending from, in addition to options. For example, a component that extends from `<button />` will accept `onClick`.

**Simple components**

You can extend an HTML element:

```tsx
/** `Button` props. */
export type ButtonProps = ExtendedProps<"button", ButtonOptions>;
```

Or another component:

```tsx
/** `Button` props. */
export type ButtonProps = ExtendedProps<Ariakit.ButtonProps, ButtonOptions>;
```

To create a component that uses these props, use `createComponent` and annotate the type with `Component`:

````tsx
/**
 * A button. Rendered as `<button />`.
 *
 * @example
 *
 * ```tsx
 * <Button variant="secondary">Click me!</Button>;
 * ```
 */
export const Button: Component<ButtonProps> = createComponent(
  ({ variant, ...props }) => (
    <button
      data-variant={variant}
      {...props}
      className={clsx(styles.button, props.className)}
    />
  )
);
````

**Polymorphic components**

First, create a "polymorphic spec" type that defines a default `as` value and maps `as` values to the base component props:

```tsx
/** `Button` polymorphic spec. */
export type ButtonAs = {
  // the default `as` value
  default: "button";

  // base props can be from plain HTML elements
  a: "a";

  // or from other components
  button: Ariakit.ButtonProps;
};
```

Then create the props type with `PolymorphicProps`. Note that the `As` type has to be generic for proper type-checking, and the default must match the `default` value in the "polymorphic spec" type:

```tsx
/** `Button` props. */
export type ButtonProps<As extends "div" | "button" | "a" = "div"> =
  PolymorphicProps<ButtonAs, As, ButtonOptions>;
```

> 🛈 Notice how the combination of the "polymorphic spec" type and `PolymorphicProps` achieves the same result as `ExtendedProps`, except it allows multiple options depending on the value of the `as` prop.

To create the component, use `createPolymorphicComponent` and annotate it with `PolymorphicComponent`. Pass it the **"polymorphic spec"** type and the **options** type (not the props type!):

````tsx
/**
 * A button.
 *
 * Use the `as` prop to render as:
 *
 * - `"button"` (default) - [`<Ariakit.Button
 *   />`](https://ariakit.org/reference/button)
 * - `"a"` - `<a />`
 *
 * @example
 *
 * ```tsx
 * <Button variant="secondary">Click me!</Button>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // as link
 * <Button as="a" href="https://dio.la/">
 *   Visit my blog
 * </Button>;
 * ```
 */
export const Button: PolymorphicComponent<AvatarAs, AvatarOptions> =
  createPolymorphicComponent(({ as = "button", variant, ...props }) => {
    const Element = as === "button" ? Ariakit.Button : as;
    return (
      <Element
        data-variant={variant}
        {...props}
        className={clsx(styles.button, props.className)}
      />
    );
  });
````

**No options?**

In some cases, you might not have any options to add. You can simply omit it in all places where you would normally pass it (`ExtendedProps`, `PolymorphicProps`, `createComponent`, `createPolymorphicComponent`).

**Default props**

To define default props, use `satisfies` to create an object:

```tsx
const DEFAULT_PROPS = {
  variant: "primary",
} satisfies Partial<ButtonProps>;
```

Then, use it when destructuring props:

```tsx
export const Button = createComponent<ButtonProps>(
  ({ as = "button", variant = DEFAULT_PROPS.variant, ...props }) => {
    /* ... */
  }
);
```

> 🛈 If you're on an older TypeScript version that doesn't support `satisfies`, you use `as const` to achieve similar types (with less type-safety thought!).

### Extending components

> **TODO:** open/closed, polymorphic, etc.

### Compound components

> **TODO:** second `Component` type argument, documentation, etc.

### Component stores

> **TODO:** Ariakit stores, stores as component properties, etc.

### Component documentation

> **TODO:** extension and rendering docs, polymorphic, examples, etc.

## Creating a design system package

> **TODO:** recommended file structure, packaging, etc.
