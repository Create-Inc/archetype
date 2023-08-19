import type { Meta, StoryObj } from "@storybook/react";

import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Toast",
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Playground: Story = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#F5F5F5",
        },
      ],
    },
  },
  args: {
    title: "Short Title",
    children: "Here's a description",
    dismissible: true,
  },
};
