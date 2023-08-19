import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Progress",
  component: Progress,
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  args: {
    className: "w-[20rem]",
    value: 30,
    max: 100,
  },
};
withFeatures(Playground, ["controls"]);
