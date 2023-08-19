import type { Meta, StoryObj } from "@storybook/react";

import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "TextArea",
  component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {
  args: {
    className: "w-[20rem] max-h-[20rem]",
    placeholder: "Type your message here.",
    disabled: false,
    rows: 5,
  },
};
