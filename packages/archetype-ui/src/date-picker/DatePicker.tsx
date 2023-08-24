import {
  type Component,
  createComponent,
  type ExtendedProps,
} from "@createinc/archetype";
import { format } from "date-fns";

import { type CalendarSingleProps } from "../calendar";
import { DatePickerBase, type DatePickerBaseOptions } from "./DatePickerBase";

const DEFAULT_PROPS = {
  placeholder: "Pick a date",
  dateFormat: "PPP",
} satisfies Partial<DatePickerProps>;

/**
 * A date picker. Extends `<Calendar mode="single" />` (which extends
 * [`<DayPicker />`](https://react-day-picker.js.org/)). Rendered as `<Button
 * />` (`<button />`).
 *
 * The button opens a popover with the calendar.
 *
 * All props are forwarded to `<Calendar />` except `className` and `style`,
 * which are passed to `<Button />`.
 *
 * Props can also be explicitly passed via `buttonProps` and `calendarProps`.
 * Additionally, `popoverProps`, `popoverDisclosureProps` and
 * `popoverContentProps` can be used to pass props to the popover components.
 *
 * @example
 *
 * ```tsx
 * const [day, setDay] = useState<Date>();
 * <DatePicker selected={day} onSelect={setDay} />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // custom placeholder
 * <DatePicker
 *   placeholder="Select a date for the event"
 *   // ...
 * />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // custom date format
 * <DatePicker
 *   dateFormat="iii, MMM do"
 *   // ...
 * />;
 * ```
 */
export const DatePicker: Component<DatePickerProps> = createComponent(
  ({
    placeholder = DEFAULT_PROPS.placeholder,
    dateFormat = DEFAULT_PROPS.dateFormat,
    ...props
  }) => {
    const value = props.calendarProps?.selected ?? props.selected;
    const formattedValue = value ? format(value, dateFormat) : undefined;

    return (
      <DatePickerBase
        hasValue={Boolean(value)}
        buttonLabel={formattedValue ?? placeholder}
        mode="single"
        defaultMonth={value}
        {...props}
      />
    );
  }
);

/** `DatePicker` options. */
export type DatePickerOptions = DatePickerBaseOptions & {
  /**
   * Placeholder text displayed when there is no selection.
   *
   * @default "Pick a date"
   */
  placeholder?: string;

  /**
   * Format string used to format the selected date with [`date-fns`'s `format`
   * function](https://date-fns.org/v2.30.0/docs/format).
   *
   * @default "PPP"
   */
  dateFormat?: string;

  /** Props passed to `<Calendar mode="single" />`. */
  calendarProps?: CalendarSingleProps;
};

/** `DatePicker` props. */
export type DatePickerProps = ExtendedProps<
  CalendarSingleProps,
  DatePickerOptions
>;
