import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

import { withAction, withFeatures } from "../../.storybook/utils";
import { DateRangePicker } from "./DateRangePicker";

const meta: Meta<typeof DateRangePicker> = {
  title: "DateRangePicker",
  component: DateRangePicker,
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Playground: Story = {
  render: function Render(props) {
    const [range, setRange] = useState<DateRange>();
    return (
      <DateRangePicker
        {...props}
        selected={range}
        onSelect={withAction("selected", setRange)}
      />
    );
  },
  args: { className: "" },
};
withFeatures(Playground, ["controls", "actions"]);
