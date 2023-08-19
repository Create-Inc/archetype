import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { FileInput } from "./FileInput";

const meta: Meta<typeof FileInput> = {
  title: "FileInput",
  component: FileInput,
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Playground: Story = {
  args: {
    className: "w-[16rem]",
    disabled: false,
  },
  argTypes: { onChange: { action: "changed" } },
};
withFeatures(Playground, ["controls", "actions"]);
