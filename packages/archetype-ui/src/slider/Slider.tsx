import "./Slider.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import {
  Slider as MuiSlider,
  type SliderProps as MuiSliderProps,
} from "@mui/base/Slider";
import clsx from "clsx";
import { type ComponentPropsWithRef } from "react";

const styles = scopedStyles("Slider");

/**
 * A slider input. Extends [`<Slider />` from Base
 * UI](https://mui.com/base-ui/react-slider/). Rendered as `<div />`.
 *
 * Renders a hidden `<input type="range" />` internally.
 *
 * @example
 *
 * ```tsx
 * <Slider name="amount" />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // uncontrolled
 * <Slider name="amount" defaultValue={value} />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // controlled
 * const [value, setValue] = useState(50);
 * <Slider
 *   name="amount"
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 * />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // custom parameters
 * <Slider
 *   min={20}
 *   max={250}
 *   step={5}
 *   // ...
 * />;
 * ```
 */
export const Slider: Component<SliderProps> = createComponent((props) => (
  <MuiSlider
    {...props}
    className={clsx(styles.slider, props.className)}
    slotProps={{
      track: { className: styles.range },
      rail: { className: styles.track },
      thumb: { className: styles.thumb },
      input: { className: styles.thumbInput },
    }}
  />
));

/** `Slider` props. */
export type SliderProps = ExtendedProps<
  ComponentPropsWithRef<"div"> &
    Pick<
      MuiSliderProps,
      | "defaultValue"
      | "disabled"
      | "max"
      | "min"
      | "name"
      | "onChange"
      | "step"
      | "value"
    >
>;
