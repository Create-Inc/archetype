import "./Calendar.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";
import {
  type DateRange,
  DayPicker,
  type DayPickerDefaultProps,
  type DayPickerMultipleProps,
  type DayPickerProps,
  type DayPickerRangeProps,
  type DayPickerSingleProps,
} from "react-day-picker";

import { Icon } from "../icon";
import { luChevronLeft, luChevronRight } from "../icons";

const styles = scopedStyles("Calendar");

const DEFAULT_PROPS = {
  showOutsideDays: true,
} satisfies Partial<CalendarProps>;

/**
 * A calendar that supports single, multiple and range selection. Extends
 * [`<DayPicker />`](https://react-day-picker.js.org/). Rendered as `<div />`.
 *
 * @example
 *
 * ```tsx
 * // single selection
 * const [date, setDate] = useState<Date>();
 * // alternatively, use today's date as default
 * const [date, setDate] = useState<Date | undefined>(new Date());
 * <Calendar mode="single" selected={date} onSelect={setDate} />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // multiple selection
 * const [days, setDays] = useState<Date[]>();
 * <Calendar mode="multiple" selected={days} onSelect={setDays} />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // range selection
 * const [range, setRange] = useState<CalendarRange | undefined>();
 * <Calendar mode="range" selected={range} onSelect={setRange} />;
 * ```
 */
export const Calendar: Component<CalendarProps> = createComponent(
  ({ showOutsideDays = DEFAULT_PROPS.showOutsideDays, ...props }) => (
    <DayPicker
      showOutsideDays={showOutsideDays}
      {...props}
      className={clsx(styles.calendar, props.className)}
      classNames={{
        months: styles.months,
        month: styles.month,
        caption: styles.caption,
        caption_label: styles.captionLabel,
        nav: styles.nav,
        nav_button: styles.navButton,
        nav_button_previous: styles.navButtonPrevious,
        nav_button_next: styles.navButtonNext,
        table: styles.table,
        head_row: styles.headRow,
        head_cell: styles.headCell,
        row: styles.row,
        cell: styles.cell,
        day: styles.day,
        day_selected: styles.daySelected,
        day_today: styles.dayToday,
        day_outside: styles.dayOutside,
        day_disabled: styles.dayDisabled,
        day_range_middle: styles.dayRangeMiddle,
        day_hidden: styles.dayHidden,
        ...props.classNames,
      }}
      components={{
        IconLeft: ({ ...iconProps }) => (
          <Icon icon={luChevronLeft} className={styles.icon} {...iconProps} />
        ),
        IconRight: ({ ...iconProps }) => (
          <Icon icon={luChevronRight} className={styles.icon} {...iconProps} />
        ),
        ...props.components,
      }}
    />
  )
);

/** `Calendar` props. */
export type CalendarProps = ExtendedProps<DayPickerProps>;

/** `Calendar` props when `mode="default"`. */
export type CalendarDefaultProps = Omit<
  ExtendedProps<DayPickerDefaultProps>,
  "mode"
>;

/** `Calendar` props when `mode="single"`. */
export type CalendarSingleProps = Omit<
  ExtendedProps<DayPickerSingleProps>,
  "mode"
>;

/** `Calendar` props when `mode="multiple"`. */
export type CalendarMultipleProps = Omit<
  ExtendedProps<DayPickerMultipleProps>,
  "mode"
>;

/** `Calendar` props when `mode="range"`. */
export type CalendarRangeProps = Omit<
  ExtendedProps<DayPickerRangeProps>,
  "mode"
>;

/** `Calendar` range. Alias for React DayPicker's `DateRange`. */
export type CalendarRange = DateRange;
