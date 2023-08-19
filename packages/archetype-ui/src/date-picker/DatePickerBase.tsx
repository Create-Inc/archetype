/* eslint-disable @typescript-eslint/no-explicit-any */
import "./DatePickerBase.scoped.css";

import { mergeProps, scopedStyles } from "@createinc/archetype";
import clsx from "clsx";

import { Button, type ButtonProps } from "../button";
import { Calendar, type CalendarProps } from "../calendar";
import { Icon } from "../icon";
import { luCalendar } from "../icons";
import {
  Popover,
  type PopoverContentProps,
  type PopoverDisclosureProps,
  type PopoverProps,
} from "../popover";

const styles = scopedStyles("DatePickerBase");

export function DatePickerBase({
  hasValue,
  buttonLabel,
  className,
  style,
  buttonProps,
  calendarProps,
  popoverProps,
  popoverDisclosureProps,
  popoverContentProps,
  ...props
}: DatePickerBaseProps) {
  return (
    <Popover {...popoverProps}>
      <Popover.Disclosure {...popoverDisclosureProps}>
        <Button
          variant="outline"
          data-has-value={hasValue ? "" : undefined}
          {...mergeProps(
            { className, style },
            { className: styles.trigger },
            buttonProps
          )}
        >
          <Icon icon={luCalendar} className={styles.icon} />
          <span>{buttonLabel}</span>
        </Button>
      </Popover.Disclosure>
      <Popover.Content
        {...popoverContentProps}
        className={clsx(styles.popover, popoverContentProps?.className)}
      >
        <Calendar initialFocus {...(props as any)} {...calendarProps} />
      </Popover.Content>
    </Popover>
  );
}

export type DatePickerBaseOptions = {
  /** Props passed to `<Button />`. */
  buttonProps?: ButtonProps;

  /** Props passed to `<Popover />`. */
  popoverProps?: PopoverProps;

  /** Props passed to `<Popover.Disclosure />`. */
  popoverDisclosureProps?: PopoverDisclosureProps;

  /** Props passed to `<Popover.Content />`. */
  popoverContentProps?: PopoverContentProps;
};

export type DatePickerBaseProps = CalendarProps &
  DatePickerBaseOptions & {
    hasValue?: boolean;
    buttonLabel: string;
    calendarProps?: CalendarProps;
  };
