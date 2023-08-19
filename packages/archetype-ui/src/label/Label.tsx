import "./Label.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Label");

/**
 * A label. Rendered as `<label />`.
 *
 * @example
 *
 * ```tsx
 * <div className="flex items-center gap-2">
 *   <Checkbox id="terms" />
 *   <Label htmlFor="terms">Accept terms and conditions</Label>
 * </div>;
 * ```
 */
export const Label: Component<LabelProps> = createComponent(
  ({ disabled, ...props }) => (
    <label
      data-disabled={disabled ? "" : undefined}
      {...props}
      className={clsx(styles.label, props.className)}
    />
  )
);

/** `Label` options. */
export type LabelOptions = {
  /** Whether to display disabled styles. */
  disabled?: boolean;
};

/** `Label` props. */
export type LabelProps = ExtendedProps<"label", LabelOptions>;
