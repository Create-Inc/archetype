import {
  type Component,
  createComponent,
  type ExtendedProps,
} from "@createinc/archetype";
import { format } from "date-fns";

import { type CalendarRangeProps } from "../calendar";
import { DatePickerBase, type DatePickerBaseOptions } from "./DatePickerBase";

const DEFAULT_RANGE_PROPS = {
  placeholder: "Pick a date range",
  dateFormat: "PP",
} satisfies Partial<DateRangePickerProps>;

/**
 * A date range picker. Extends `<Calendar mode="range" />` (which extends
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
 * const [range, setRange] = useState<DateRange>();
 * <DateRangePicker selected={range} onSelect={setRange} />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // custom placeholder
 * <DateRangePicker
 *   placeholder="Select check-in and check-out dates"
 *   // ...
 * />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // custom date format
 * <DateRangePicker
 *   dateFormat="d MMM"
 *   // ...
 * />;
 * ```
 */
export const DateRangePicker: Component<DateRangePickerProps> = createComponent(
  ({
    placeholder = DEFAULT_RANGE_PROPS.placeholder,
    dateFormat = DEFAULT_RANGE_PROPS.dateFormat,
    ...props
  }) => {
    const value = props.calendarProps?.selected ?? props.selected;
    let formattedValue: string | undefined;
    if (value && value.from)
      if (value.to)
        formattedValue = `${format(value.from, dateFormat)} - ${format(
          value.to,
          dateFormat
        )}`;
      else formattedValue = format(value.from, dateFormat);

    return (
      <DatePickerBase
        hasValue={Boolean(value && value.from)}
        buttonLabel={formattedValue ?? placeholder}
        mode="range"
        defaultMonth={value?.from}
        numberOfMonths={2}
        {...props}
      />
    );
  }
);

/** `DateRangePicker` options. */
export type DateRangePickerOptions = DatePickerBaseOptions & {
  /**
   * Placeholder text displayed when there is no selection.
   *
   * @default "Pick a date range"
   */
  placeholder?: string;

  /**
   * Format string used to format the selected dates with [`date-fns`'s `format`
   * function](https://date-fns.org/v2.30.0/docs/format).
   *
   * @default "PP"
   */
  dateFormat?: string;

  /** Props passed to `<Calendar mode="range" />`. */
  calendarProps?: CalendarRangeProps;
};

/** `DateRangePicker` props. */
export type DateRangePickerProps = ExtendedProps<
  CalendarRangeProps,
  DateRangePickerOptions
>;
