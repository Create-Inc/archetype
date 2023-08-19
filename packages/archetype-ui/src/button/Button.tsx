import "./Button.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  createPolymorphicComponent,
  type IconData,
  type PolymorphicProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

import { Icon } from "../icon";

const styles = scopedStyles("Button");

const DEFAULT_PROPS = {
  variant: "primary",
  size: "default",
} as const; // satisfies Partial<ButtonProps>

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
 * <Button variant="secondary" size="large">
 *   Click me!
 * </Button>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // as link
 * <Button as="a" variant="link" href="https://dio.la/">
 *   Visit my blog
 * </Button>;
 * ```
 */
export const Button = createPolymorphicComponent<ButtonAs, ButtonOptions>(
  ({
    as = "button",
    variant = DEFAULT_PROPS.variant,
    size = DEFAULT_PROPS.size,
    icon,
    trailingIcon,
    ...props
  }) => {
    const Element = as === "button" ? Ariakit.Button : as;
    return (
      <Element
        data-variant={variant}
        data-size={size}
        {...props}
        className={clsx(styles.button, props.className)}
      >
        {icon && <Icon className={styles.icon} icon={icon} />}
        {props.children}
        {trailingIcon && <Icon className={styles.icon} icon={trailingIcon} />}
      </Element>
    );
  }
);

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

  /**
   * The size of the button.
   *
   * @default "default"
   */
  size?: "default" | "sm" | "lg" | "icon";

  /** The button's icon. */
  icon?: IconData;

  /** The button's trailing icon. */
  trailingIcon?: IconData;
};

/** `Button` polymorphic spec. */
export type ButtonAs = {
  default: "button";
  button: Ariakit.ButtonProps<"button">;
  a: "a";
};

/** `Button` props. */
export type ButtonProps<As extends "button" | "a" = "button"> =
  PolymorphicProps<ButtonAs, As, ButtonOptions>;
