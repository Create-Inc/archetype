import "./Badge.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  createPolymorphicComponent,
  type IconData,
  type PolymorphicComponent,
  type PolymorphicProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

import { Icon } from "../icon";

const styles = scopedStyles("Badge");

const DEFAULT_PROPS = {
  variant: "default",
} as const; // satisfies Partial<BadgeProps>;

/**
 * A badge.
 *
 * Use the `as` prop to render as:
 *
 * - `"div"` (default) - `<div />`
 * - `"button"` - [`<Ariakit.Button />`](https://ariakit.org/reference/button)
 * - `"a"` - `<a />`
 *
 * @example
 *
 * ```tsx
 * <Badge variant="secondary">Alpha</Badge>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // with icons
 * <Badge
 *   icon={luInfo}
 *   trailingIcon={luMoreHorizontal}
 *   // ...
 * >
 *   ...
 * </Badge>;
 * ```
 */
export const Badge: PolymorphicComponent<BadgeAs, BadgeOptions> =
  createPolymorphicComponent(
    ({
      as = "div",
      variant = DEFAULT_PROPS.variant,
      icon,
      trailingIcon,
      ...props
    }) => {
      const Element = as === "button" ? Ariakit.Button : as;
      return (
        <Element
          data-variant={variant}
          data-interactive={as === "button" || as === "a" ? "" : undefined}
          {...props}
          className={clsx(styles.badge, props.className)}
        >
          {icon && <Icon className={styles.icon} icon={icon} />}
          {props.children}
          {trailingIcon && <Icon className={styles.icon} icon={trailingIcon} />}
        </Element>
      );
    }
  );

/** `Badge` options. */
export type BadgeOptions = {
  /**
   * The badge's visual appearance.
   *
   * @default "default"
   */
  variant?: "default" | "secondary" | "destructive" | "outline";

  /** The badge's icon. */
  icon?: IconData;

  /** The badge's trailing icon. */
  trailingIcon?: IconData;
};

/** `Badge` polymorphic spec. */
export type BadgeAs = {
  default: "div";
  div: "div";
  button: Ariakit.ButtonProps<"button">;
  a: "a";
};

/** `Badge` props. */
export type BadgeProps<As extends "div" | "button" | "a" = "div"> =
  PolymorphicProps<BadgeAs, As, BadgeOptions>;
