import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  args: {
    className: "",
    as: "div",
    name: "Dani Guardiola",
    image: "https://i.pravatar.cc/300",
    disabled: false,
    href: "https://dio.la/",
    target: "_blank",
  },
  argTypes: { onClick: { action: "clicked" } },
};
withFeatures(Playground, ["controls", "actions"]);
