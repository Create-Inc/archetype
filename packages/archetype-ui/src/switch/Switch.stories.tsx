import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  args: { size: "md", defaultChecked: false, disabled: false },
};
