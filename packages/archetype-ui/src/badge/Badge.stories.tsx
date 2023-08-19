import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures, withIconControls } from "../../.storybook/utils";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    className: "",
    as: "div",
    variant: "default",
    children: "Badge",
    disabled: false,
    href: "https://dio.la/",
    target: "_blank",
  },
  argTypes: { onClick: { action: "clicked" } },
};
withFeatures(Playground, ["controls", "actions"]);
withIconControls(Playground, ["icon", "trailingIcon"]);
