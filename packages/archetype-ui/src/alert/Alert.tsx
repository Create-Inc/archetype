import "./Alert.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  type IconData,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

import { Icon } from "../icon";

const styles = scopedStyles("Alert");

// alert
// -----

const DEFAULT_ALERT_PROPS = {
  variant: "default",
} as const; // satisfies Partial<AlertProps>

/**
 * An alert banner. Rendered as `<section />`.
 *
 * @example
 *
 * ```tsx
 * <Alert>
 *   <Alert.Title>Title</Alert.Title>
 *   <Alert.Description>Description</Alert.Description>
 * </Alert>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // with icon
 * <Alert icon={luInfo}>...</Alert>;
 * ```
 */
export const Alert: Component<AlertProps, Properties> = createComponent(
  ({ variant = DEFAULT_ALERT_PROPS.variant, children, icon, ...props }) => (
    <section
      data-variant={variant}
      data-has-icon={icon ? "" : undefined}
      {...props}
      className={clsx(styles.alert, props.className)}
    >
      {icon && <Icon icon={icon} className={styles.icon} />}
      {children}
    </section>
  )
);

/** `Alert` options. */
export type AlertOptions = {
  /**
   * The alert's visual appearance.
   *
   * @default "default"
   */
  variant?: "default" | "destructive";

  /** The alert's icon. */
  icon?: IconData;
};

/** `Alert` props. */
export type AlertProps = ExtendedProps<"section", AlertOptions>;

// title
// -----

const Title: Component<AlertTitleProps> = createComponent((props) => (
  <h1 {...props} className={clsx(styles.title, props.className)} />
));

/** `Alert.Title` props. */
export type AlertTitleProps = ExtendedProps<"h1">;

Alert.Title = Title;
interface Properties {
  /**
   * The title of the alert. Rendered as `<h1 />`.
   *
   * @example
   *
   * ```tsx
   * <Alert.Title>A title</Alert.Title>;
   * ```
   */
  Title: typeof Title;
}

// description
// -----------

const Description: Component<AlertDescriptionProps> = createComponent(
  (props) => (
    <p {...props} className={clsx(styles.description, props.className)} />
  )
);

/** `Alert.Description` props. */
export type AlertDescriptionProps = ExtendedProps<"p">;

Alert.Description = Description;
interface Properties {
  /**
   * The description of the alert. Rendered as `<p />`.
   *
   * @example
   *
   * ```tsx
   * <Alert.Description>Some description</Alert.Description>;
   * ```
   */
  Description: typeof Description;
}
