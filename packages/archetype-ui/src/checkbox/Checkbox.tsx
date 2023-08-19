import "./Checkbox.scoped.css";

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

import { Icon } from "../icon";
import { luCheck } from "../icons";

const styles = scopedStyles("Checkbox");

/**
 * A checkbox. Extends [`<Ariakit.Checkbox
 * />`](https://ariakit.org/reference/checkbox). Rendered as `<div />`.
 *
 * Renders a hidden `<input type="checkbox" />` internally.
 *
 * All props are forwarded to `<Ariakit.Checkbox />` except `className`, `style`
 * and `children`, which are passed to the root `<div />`.
 *
 * Props can also be explicitly passed via `rootProps` and `checkboxProps`.
 *
 * @example <Checkbox name="remember-password" defaultChecked />
 */
export const Checkbox: Component<CheckboxProps> = createComponent((props) => {
  const checkboxProps = useCheckbox(props);
  return (
    <Ariakit.Checkbox
      {...checkboxProps}
      className={clsx(styles.checkbox, checkboxProps.className)}
    >
      <Icon icon={luCheck} className={styles.check} />
    </Ariakit.Checkbox>
  );
});

/** `Checkbox` options. */
type CheckboxOptions = UseCheckboxOptions;

/** `Checkbox` props. */
export type CheckboxProps = ExtendedProps<
  Ariakit.CheckboxProps,
  CheckboxOptions
>;
