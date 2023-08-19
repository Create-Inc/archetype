import "./RadioGroup.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type DataAttributes,
  type ExtendedProps,
  mergeProps,
  scopedStyles,
  useId,
} from "@createinc/archetype";
import clsx from "clsx";
import { type ComponentPropsWithRef } from "react";

import { Label, type LabelProps } from "../label";

const styles = scopedStyles("RadioGroup");

// radio group
// -----------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useRadioStore,
  "RadioGroup"
);

// split into a different component in order to use the store context
const InternalRadioGroup: Component<ExtendedProps<Ariakit.RadioGroupProps>> =
  createComponent((props) => {
    return (
      <Ariakit.RadioGroup
        store={useStoreContext()}
        {...props}
        className={clsx(styles.group, props.className)}
      />
    );
  });

/**
 * A radio group. Extends
 * [`Ariakit.RadioGroup`](https://ariakit.org/reference/radio-group). Rendered
 * as `<div />`.
 *
 * @example
 *
 * ```tsx
 * <RadioGroup>
 *   <RadioGroup.LabelledRadio value="default">
 *     Default
 *   </RadioGroup.LabelledRadio>
 *   <RadioGroup.LabelledRadio value="comfortable" disabled>
 *     Comfortable
 *   </RadioGroup.LabelledRadio>
 *   <RadioGroup.LabelledRadio value="compact">
 *     Compact
 *   </RadioGroup.LabelledRadio>
 * </RadioGroup>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // uncontrolled
 * <RadioGroup storeProps={{ defaultValue: "apple" }}>...</RadioGroup>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // controlled
 * const [value, setValue] = useState<RadioGroupValue>("orange");
 * <RadioGroup storeProps={{ value, setValue }}>...</RadioGroup>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // manual labels (not recommended)
 * <RadioGroup>
 *   <div className="flex items-center gap-2">
 *     <RadioGroup.Radio id="default" value="default" />
 *     <Label htmlFor="default">Default</Label>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <RadioGroup.Radio id="comfortable" value="comfortable" disabled />
 *     <Label htmlFor="comfortable" disabled>
 *       Comfortable
 *     </Label>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <RadioGroup.Radio id="compact" value="compact" />
 *     <Label htmlFor="compact">Compact</Label>
 *   </div>
 * </RadioGroup>;
 * ```
 */
export const RadioGroup: Component<RadioGroupProps, Properties> =
  createComponent(({ store, storeProps, ...props }) => (
    <Root store={store} {...storeProps}>
      <InternalRadioGroup {...props} />
    </Root>
  ));

/** `RadioGroup` options. */
export type RadioGroupOptions = {
  /** The Ariakit store. */
  store?: Ariakit.RadioStore;

  /** The Ariakit store props. */
  storeProps?: Omit<Ariakit.RadioStoreProps, "store">;
};

/** `RadioGroup` props. */
export type RadioGroupProps = ExtendedProps<
  Ariakit.RadioGroupProps,
  RadioGroupOptions
>;

/** `RadioGroup` value. */
export type RadioGroupValue = Ariakit.RadioStoreState["value"];

// store
// -----

RadioGroup.useStore = Ariakit.useRadioStore;
RadioGroup.useStoreContext = useStoreContext;
interface Properties {
  /**
   * `RadioGroup` Ariakit store hook. Extends
   * [`Ariakit.useRadioStore`](https://ariakit.org/reference/use-radio-store).
   *
   * @example
   *
   * ```tsx
   * const radioStore = RadioGroup.useStore();
   * ```
   */
  useStore: typeof Ariakit.useRadioStore;

  /**
   * `RadioGroup` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const radioStore = RadioGroup.useStoreContext();
   * ```
   */
  useStoreContext: typeof useStoreContext;
}

// radio
// -----

const Radio: Component<RadioGroupRadioProps> = createComponent((props) => (
  <Ariakit.Radio {...props} className={clsx(styles.radio, props.className)} />
));

/** `RadioGroup.Radio` props. */
export type RadioGroupRadioProps = ExtendedProps<Ariakit.RadioProps>;

RadioGroup.Radio = Radio;
interface Properties {
  /**
   * A radio input. Must be a child of `<RadioGroup />`. Extends
   * [`Ariakit.Radio`](https://ariakit.org/reference/radio). Rendered as `<input
   * type="radio" />`.
   *
   * @example
   *
   * ```tsx
   * <RadioGroup>
   *   <div className="flex items-center gap-2">
   *     <RadioGroup.Radio id="default" value="default" />
   *     <Label htmlFor="default">Default</Label>
   *   </div>
   *   ...
   * </RadioGroup>;
   * ```
   */
  Radio: typeof Radio;
}

// labelled radio
// --------------

const LabelledRadio: Component<RadioGroupLabelledRadioProps> = createComponent(
  ({
    className,
    style,
    radioProps,
    labelProps,
    rootProps,
    children,
    ...props
  }) => {
    const id = useId();
    return (
      <div
        {...mergeProps(
          { className: styles.labelledRadio },
          { className, style },
          rootProps
        )}
      >
        <Radio id={id} {...mergeProps(props, radioProps)} />
        <Label htmlFor={id} disabled={props.disabled} {...labelProps}>
          {children}
        </Label>
      </div>
    );
  }
);

/** `RadioGroup.Radio` props. */
export type RadioGroupLabelledRadioOptions = {
  /** Props passed to [`Ariakit.Radio`](https://ariakit.org/reference/radio). */
  radioProps?: RadioGroupRadioProps;

  /** Props passed to `<Label />`. */
  labelProps?: LabelProps;

  /** Props passed to the root `<div />` element. */
  rootProps?: ComponentPropsWithRef<"div"> & DataAttributes;
};

/** `RadioGroup.Radio` props. */
export type RadioGroupLabelledRadioProps = ExtendedProps<
  Ariakit.RadioProps,
  RadioGroupLabelledRadioOptions
>;

RadioGroup.LabelledRadio = LabelledRadio;
interface Properties {
  /**
   * A radio input with a label. Must be a child of `<RadioGroup />`. Extends
   * `RadioGroup.Radio`. Rendered as `<div />`.
   *
   * It renders a `<RadioGroup.Radio />` and a `<Label />` internally, and links
   * them together with `id` and `htmlFor`.
   *
   * All props are forwarded to `<RadioGroup.Radio />` except `className` and
   * `style` which are passed to the root `<div />`, and `children` which is
   * passed to `<Label />`.
   *
   * Props can also be explicitly passed via `rootProps`, `radioProps` and
   * `labelProps`.
   *
   * @example
   *
   * ```tsx
   * <RadioGroup>
   *   <RadioGroup.LabelledRadio value="default">
   *     Default
   *   </RadioGroup.LabelledRadio>
   *   ...
   * </RadioGroup>;
   * ```
   */
  LabelledRadio: typeof LabelledRadio;
}
