import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures, withIconControls } from "../../.storybook/utils";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    className: "",
    as: "button",
    disabled: false,
    variant: "primary",
    size: "default",
    children: "Button",
    href: "https://dio.la/",
    target: "_blank",
  },
  argTypes: { onClick: { action: "clicked" } },
};
withFeatures(Playground, ["controls", "actions"]);
withIconControls(Playground, ["icon", "trailingIcon"]);
