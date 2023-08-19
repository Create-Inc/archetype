import "./Toast.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

import { Button } from "../button";
import { Icon } from "../icon";

const styles = scopedStyles("Toast");

/**
 * A Toast component. Rendered as `<section />`.
 *
 * @example
 *
 * ```tsx
 * <Toast dismissible />;
 * ```
 */
export const Toast: Component<ToastProps> = createComponent(
  ({ dismissible, heading, children, ...props }) => (
    <section {...props} className={clsx(styles.toast, props.className)}>
      {heading ? <h1 className={clsx(styles.heading)}>{heading}</h1> : null}
      <div className={clsx(styles.body)}>
        <div className={styles.content}>{children}</div>
        {/* TODO: Update with the new icon pack */}
        {/* TODO: Use the `icon` props in the button */}
        {dismissible ? (
          <Button variant="ghost">
            <Icon
              stroke="#667085"
              fill="#667085"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              icon={`M13 1L1 13M1 1L13 13`}
            />
          </Button>
        ) : null}
      </div>
    </section>
  )
);

/** `Toast` options. */
type ToastOptions = {
  /** The title of the toast. */
  heading?: string;

  /**
   * Whether the toast should be dismissible with a button.
   *
   * @default false
   */
  dismissible?: boolean;
};

/** `Toast` props. */
export type ToastProps = ExtendedProps<"section", ToastOptions>;
