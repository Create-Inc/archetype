import "./Icon.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  type IconData,
  mergeProps,
  scopedStyles,
  useIconSvgProps,
} from "@createinc/archetype";

const styles = scopedStyles("Icon");

const DEFAULT_ICON_SIZE = 20;

/**
 * An icon. Rendered as `<svg />`.
 *
 * Colored according to the current text color.
 *
 * Automatically sized based on the original icon size, or 20px if not known. A
 * custom size can be set with CSS.
 *
 * @example
 *
 * ```tsx
 * <Icon icon={luCheck} />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // custom size
 * <Icon icon={luCheck} className="w-8 h-8" />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // custom color
 * <Icon icon={luCheck} className="text-red-500" />;
 * ```
 */
export const Icon: Component<IconProps> = createComponent(
  ({ icon, ...props }) => (
    <svg
      {...mergeProps(
        useIconSvgProps(icon, { defaultSize: DEFAULT_ICON_SIZE }),
        { className: styles.icon },
        props
      )}
    />
  )
);

/** `Icon` options. */
export type IconOptions = {
  /** The icon to render. Must follow the Archetype icon format (`IconData`). */
  icon: IconData;
};

/** `Icon` props. */
export type IconProps = ExtendedProps<"svg", IconOptions>;
