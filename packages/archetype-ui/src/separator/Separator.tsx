import "./Separator.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Separator");

const DEFAULT_PROPS = {
  orientation: "horizontal",
} satisfies Partial<SeparatorProps>;

/**
 * A separator. Rendered as `<hr />`.
 *
 * @example
 *
 * ```tsx
 * <div className="space-y-1">
 *   <p>Paragraph 1</p>
 *   <Separator />
 *   <p>Paragraph 2</p>
 * </div>;
 * ```
 */
export const Separator: Component<SeparatorProps> = createComponent(
  ({ orientation = DEFAULT_PROPS.orientation, ...props }) => (
    <Ariakit.Separator
      data-orientation={orientation}
      {...props}
      className={clsx(styles.separator, props.className)}
    />
  )
);

/** Separator options. */
export type SeparatorOptions = {
  /**
   * The separator's orientation.
   *
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
};

/** Separator props. */
export type SeparatorProps = ExtendedProps<"hr", SeparatorOptions>;
