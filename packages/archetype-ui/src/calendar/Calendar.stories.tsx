import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { withAction, withFeatures } from "../../.storybook/utils";
import { Calendar, type CalendarRange } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Calendar",
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Playground: Story = {
  render: function Render(props) {
    const { mode = "single" } = props;

    // default mode
    const defaultProps = {
      mode: "default",
    } as const;

    // multiple mode
    const [days, setDays] = useState<Date[]>();
    const multipleProps = {
      mode: "multiple",
      selected: days,
      onSelect: withAction("selected (multiple)", setDays),
    } as const;

    // range mode
    const [range, setRange] = useState<CalendarRange>();
    const rangeProps = {
      mode: "range",
      selected: range,
      onSelect: withAction("selected (range)", setRange),
    } as const;

    // single mode
    const [date, setDate] = useState<Date>();
    const singleProps = {
      mode: "single",
      selected: date,
      onSelect: withAction("selected (single)", setDate),
    } as const;

    const propsByMode = {
      default: defaultProps,
      multiple: multipleProps,
      range: rangeProps,
      single: singleProps,
    } as const;

    return <Calendar {...props} {...propsByMode[mode]} />;
  },
  args: {
    className: "rounded-md border inline-block",
    mode: "single",
    disabled: false,
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["default", "multiple", "range", "single"],
    },
  },
};
withFeatures(Playground, ["controls", "actions"]);
