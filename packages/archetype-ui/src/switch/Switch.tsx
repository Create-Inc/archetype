import "./Switch.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
  useCheckbox,
  type UseCheckboxOptions,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Switch");

const DEFAULT_PROPS = {
  size: "md",
} satisfies Partial<SwitchProps>;

/**
 * A switch. Extends [`<Ariakit.Checkbox
 * />`](https://ariakit.org/reference/checkbox). Rendered as `<div />`.
 *
 * Renders a hidden `<input type="checkbox" />` internally.
 *
 * All props are forwarded to `<Ariakit.Checkbox />` except `className`, `style`
 * and `children`, which are passed to the root `<div />`.
 *
 * Props can also be explicitly passed via `rootProps` and `checkboxProps`.
 *
 * @example <Switch size="md" defaultChecked />
 */
export const Switch: Component<SwitchProps> = createComponent(
  ({ size = DEFAULT_PROPS.size, ...props }) => {
    const checkboxProps = useCheckbox(props);
    return (
      <Ariakit.Checkbox
        role="switch"
        {...checkboxProps}
        className={clsx(styles.switch, `size-${size}`, checkboxProps.className)}
      >
        <div className={styles.thumb} />
      </Ariakit.Checkbox>
    );
  }
);

/** `Switch` options. */
type SwitchOptions = UseCheckboxOptions & {
  /**
   * The size of the switch.
   *
   * @default "medium"
   */
  size?: "sm" | "md" | "lg";
};

/** `Switch` props. */
export type SwitchProps = ExtendedProps<Ariakit.CheckboxProps, SwitchOptions>;
