import "./Toggle.scoped.css";

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

const styles = scopedStyles("Toggle");

const DEFAULT_PROPS = {
  variant: "default",
  size: "default",
} satisfies Partial<ToggleProps>;

/**
 * Toggle Component A two-state button that can be either on or off.
 *
 * @example
 *
 * ```tsx
 * <Toggle variant="default" size="default">
 *   <Icon icon={luItalic} />
 * </Toggle>;
 * ```
 */
export const Toggle: Component<ToggleProps> = createComponent(
  ({
    variant = DEFAULT_PROPS.variant,
    size = DEFAULT_PROPS.size,
    ...props
  }) => {
    const checkboxProps = useCheckbox({
      ...props,
      rootProps: {
        "data-variant": variant,
        "data-size": size,
        ...props.rootProps,
      },
    });
    return (
      <Ariakit.Checkbox
        {...checkboxProps}
        className={clsx(styles.toggle, checkboxProps.className)}
      />
    );
  }
);

/** `Toggle` Options. */
export type ToggleOptions = UseCheckboxOptions & {
  /** The toggle's variant. */
  variant: "default" | "outline";

  /** The toggle's size. */
  size: "default" | "sm" | "lg";
};

/** `Toggle` Props. */
export type ToggleProps = ExtendedProps<Ariakit.CheckboxProps, ToggleOptions>;
