import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { withAction, withFeatures } from "../../.storybook/utils";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "DatePicker",
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {
  render: function Render(props) {
    const [day, setDay] = useState<Date>();
    return (
      <DatePicker
        {...props}
        selected={day}
        onSelect={withAction("selected", setDay)}
      />
    );
  },
  args: { className: "" },
};
withFeatures(Playground, ["controls", "actions"]);
