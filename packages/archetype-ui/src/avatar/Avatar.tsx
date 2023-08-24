import "./Avatar.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  createPolymorphicComponent,
  type IconData,
  type PolymorphicComponent,
  type PolymorphicProps,
  scopedStyles,
  useAvatar,
  type UseAvatarOptions,
} from "@createinc/archetype";
import clsx from "clsx";

import { Icon } from "../icon";
import { luUser } from "../icons";

const styles = scopedStyles("Avatar");

const INITIALS_COLOR_OPTIONS = [
  "blue",
  "red",
  "green",
  "purple",
  "pink",
  "yellow",
] as const;
type InitialsColor = (typeof INITIALS_COLOR_OPTIONS)[number];
type BackgroundColor = InitialsColor | "image" | "fallback";

const DEFAULT_PROPS = {
  fallbackIcon: luUser,
} satisfies Partial<AvatarProps>;

/**
 * An avatar that displays a picture or the initials of a person or entity.
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
 * <Avatar name="Dani Guardiola" image="https://dio.la/me.png" />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // with status indicator
 * <Avatar
 *   status="green"
 *   // ...
 * />;
 * ```
 */
export const Avatar: PolymorphicComponent<AvatarAs, AvatarOptions> =
  createPolymorphicComponent(
    ({
      as = "div",
      fallbackIcon = DEFAULT_PROPS.fallbackIcon,
      name,
      initials,
      image,
      status,
      ...props
    }) => {
      const { avatarState, computedInitials, initialsColor } = useAvatar({
        name,
        initials,
        image,
        initialsColorOptions: INITIALS_COLOR_OPTIONS,
      });

      // background color
      let color: BackgroundColor;
      if (avatarState === "initials") color = initialsColor ?? "fallback";
      else if (avatarState === "image" || avatarState === "imageLoading")
        color = "image";
      else color = "fallback";

      const Element = as === "button" ? Ariakit.Button : as;
      return (
        <Element
          title={name ?? undefined}
          {...props}
          className={clsx(styles.avatar, `color-${color}`, props.className)}
        >
          <span
            className={clsx(
              styles.fallback,
              avatarState === "fallback" && "show"
            )}
          >
            <Icon className={styles.icon} icon={fallbackIcon} />
          </span>
          <div
            className={clsx(
              styles.initials,
              avatarState === "initials" && "show"
            )}
          >
            {computedInitials}
          </div>
          {image && (
            <img
              className={clsx(styles.image, avatarState === "image" && "show")}
              src={image}
              alt={`${name}'s image` ?? "The avatar's image"}
            />
          )}
          {status && <div className={clsx(styles.status, status)} />}
        </Element>
      );
    }
  );

/** `Avatar` options. */
export type AvatarOptions = {
  /** Show a status indicator. */
  status?: "green" | "yellow" | "red";

  /** The fallback icon. The default one is `luUser`. */
  fallbackIcon?: IconData;
} & Pick<UseAvatarOptions, "name" | "initials" | "image">;

/** `Avatar` polymorphic spec. */
export type AvatarAs = {
  default: "div";
  div: "div";
  button: Ariakit.ButtonProps<"button">;
  a: "a";
};

/** `Avatar` props. */
export type AvatarProps<As extends "div" | "button" | "a" = "div"> =
  PolymorphicProps<AvatarAs, As, AvatarOptions>;
