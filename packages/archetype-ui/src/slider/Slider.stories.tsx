import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Slider",
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  args: {
    className: "w-[20rem]",
    defaultValue: 37,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
  argTypes: {
    onChange: { action: "value changed" },
  },
};
withFeatures(Playground, ["controls", "actions"]);
