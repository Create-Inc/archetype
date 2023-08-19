import "./Skeleton.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Skeleton");

/**
 * A placeholder for loading content. Rendered as `<div />`.
 *
 * @example
 *
 * ```tsx
 * <Skeleton className="h-12 w-12 rounded-full" />;
 * ```
 */
export const Skeleton: Component<SkeletonProps> = createComponent((props) => (
  <div {...props} className={clsx(styles.skeleton, props.className)} />
));

/** `Skeleton` props. */
export type SkeletonProps = ExtendedProps<"div">;
