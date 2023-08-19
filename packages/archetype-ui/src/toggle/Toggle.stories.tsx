import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Icon } from "../icon";
import { luItalic } from "../icons";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Toggle",
  component: Toggle,
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Playground: Story = {
  args: {
    className: "",
    variant: "default",
    size: "sm",
    children: <Icon icon={luItalic} />,
    defaultChecked: false,
    disabled: false,
  },
  argTypes: { onChange: { action: "changed" } },
  parameters: { controls: { exclude: ["ref", "checkboxProps", "rootProps"] } },
};
withFeatures(Playground, ["controls", "actions"]);
