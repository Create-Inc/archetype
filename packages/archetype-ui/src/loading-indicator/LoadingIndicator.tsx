import "./LoadingIndicator.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("LoadingIndicator");

const DEFAULT_PROPS = {
  size: "medium",
  variant: "indeterminate",
  isInverted: false,
} satisfies Partial<LoadingIndicatorProps>;

/**
 * A LoadingIndicator. Rendered as `<svg />`.
 *
 * @example
 *
 * ```tsx
 * <LoadingIndicator />;
 * ```
 */
export const LoadingIndicator: Component<LoadingIndicatorProps> =
  createComponent(
    ({
      variant = DEFAULT_PROPS.variant,
      isInverted = DEFAULT_PROPS.isInverted,
      size = DEFAULT_PROPS.size,
      className,
      progress,
      ...props
    }) => {
      // for determinate spinners
      const isDeterminate = variant === "determinate";
      const offset = isDeterminate && progress ? 100 - progress / 2 : 100;
      const offsetProps = isDeterminate ? { strokeDashoffset: offset } : {};

      return (
        <svg
          {...props}
          ref={props.ref}
          className={clsx(
            styles.loadingIndicator,
            `size-${size} variant-${variant}`,
            { "is-inverted": isInverted },
            className
          )}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={styles.path}
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            strokeWidth="10%"
            {...offsetProps}
          />
        </svg>
      );
    }
  );

/** `LoadingIndicator` options. */
type LoadingIndicatorOptions = {
  /**
   * The size of the progress indicator.
   *
   * @default "medium"
   */
  size?: "medium" | "small";

  /**
   * Whether the indicator represents an indeterminate or determinate length of
   * time.
   *
   * @default "indeterminate"
   */
  variant?: "indeterminate" | "determinate";

  /**
   * Whether the color of the loader should be inverted to white.
   *
   * @default false
   */
  isInverted?: boolean;

  /**
   * The amount of progress. Used for determinate spinners. Should be a number
   * between 0 and 100.
   */
  progress?: number;
};

/** `LoadingIndicator` props. */
export type LoadingIndicatorProps = ExtendedProps<
  "svg",
  LoadingIndicatorOptions
>;
