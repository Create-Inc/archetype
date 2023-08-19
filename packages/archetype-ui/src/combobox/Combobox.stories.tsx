import type { Meta, StoryObj } from "@storybook/react";

import { Combobox } from "./Combobox";

const meta: Meta<typeof Combobox> = {
  title: "Combobox",
  component: Combobox,
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {
  render: function Render(props) {
    return (
      <Combobox {...props}>
        <Combobox.Input />
        <Combobox.Popover>
          <Combobox.Item value="Spain">Spain</Combobox.Item>
          <Combobox.Item value="United States">United States</Combobox.Item>
        </Combobox.Popover>
      </Combobox>
    );
  },
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
  args: {},
  argTypes: {},
};
