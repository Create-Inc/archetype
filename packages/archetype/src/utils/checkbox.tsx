import * as Ariakit from "@ariakit/react";
import { type ComponentPropsWithRef, useRef } from "react";

import {
  type DataAttributes,
  forwardInputClick,
  mergeProps,
  useMergeRefs,
} from "./react";

export type UseCheckboxOptions = {
  /**
   * Props passed to [`<Ariakit.Checkbox
   * />`](https://ariakit.org/reference/checkbox).
   */
  checkboxProps?: Ariakit.CheckboxProps;

  /** Props passed to the root `<div />` element. */
  rootProps?: ComponentPropsWithRef<"div"> & DataAttributes;
};

/**
 * Utility to build a checkbox component. Returns props that must be passed to
 * [`<Ariakit.Checkbox />`](https://ariakit.org/reference/checkbox). It provides
 * the following features:
 *
 * - Renders a hidden `<input type="checkbox" />` internally.
 * - Forwards all props to the `<input type="checkbox" />` element except for
 *   `className`, `style` and `children`, which are passed to the root `<div
 *   />`.
 * - Forwards props explicitly passed through `rootProps` and `checkboxProps`.
 * - Forwards the click event to the `<input type="checkbox" />` element.
 * - Adds the following data attributes to the root `<div />`:
 *
 *   - `data-checked` (`true` or `false`)
 *   - `data-focus-visible`
 *   - `data-disabled`
 */
export function useCheckbox({
  rootProps,
  checkboxProps: incomingCheckboxProps,
  ...props
}: Ariakit.CheckboxProps & UseCheckboxOptions): Ariakit.CheckboxProps {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    className: checkboxClassName,
    style: checkboxStyle,
    ...checkboxProps
  } = incomingCheckboxProps ?? {};
  return {
    render: ({ className, style, children, ...inputProps }) => (
      <div
        data-checked={inputProps["aria-checked"]}
        data-focus-visible={
          "data-focus-visible" in inputProps
            ? inputProps["data-focus-visible"]
            : undefined
        }
        data-disabled={inputProps["aria-disabled"] ? "" : undefined}
        {...mergeProps(
          { className, style, onClick: forwardInputClick(inputRef) },
          rootProps
        )}
      >
        <Ariakit.VisuallyHidden>
          <input
            className={checkboxClassName}
            style={checkboxStyle}
            {...inputProps}
          />
        </Ariakit.VisuallyHidden>
        {children}
      </div>
    ),
    ...props,
    ...checkboxProps,
    ref: useMergeRefs(inputRef, props.ref, checkboxProps.ref),
  };
}
