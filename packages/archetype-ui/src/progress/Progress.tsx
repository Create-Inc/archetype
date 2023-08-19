import "./Progress.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Progress");

const DEFAULT_PROPS = {
  value: 0,
  max: 100,
  getValueLabel: (value: number, max: number) =>
    `${Math.round((value / max) * 100)}%`,
} as const; // satisfies Partial<ProgressProps>

/**
 * A progress bar. Rendered as `<div />`.
 *
 * @example
 *
 * ```tsx
 * <Progress value={80} max={100} />;
 * ```
 */
export const Progress: Component<ProgressProps> = createComponent(
  ({
    value = DEFAULT_PROPS.value,
    max = DEFAULT_PROPS.max,
    getValueLabel = DEFAULT_PROPS.getValueLabel,
    ...props
  }) => (
    <div
      role="progressbar"
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={value ? value : undefined}
      aria-valuetext={value ? getValueLabel(value, max) : undefined}
      {...props}
      className={clsx(styles.progress, props.className)}
    >
      <div
        className={styles.indicator}
        style={{
          transform: `translateX(-${Math.max(100 - (value / max) * 100, 0)}%)`,
        }}
      />
    </div>
  )
);

/** `Progress` options. */
export type ProgressOptions = {
  /**
   * The current value.
   *
   * @default 0
   */
  value?: number;

  /**
   * The maximum value.
   *
   * @default 100
   */
  max?: number;

  /**
   * A function that returns the value label. Used as `aria-label`.
   *
   * @default (value: number, max: number) => "<percentage>%"
   */
  getValueLabel?: (value: number, max: number) => string;
};

/** `Progress` props. */
export type ProgressProps = ExtendedProps<"div", ProgressOptions>;
