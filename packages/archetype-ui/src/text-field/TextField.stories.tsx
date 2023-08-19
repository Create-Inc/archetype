/* eslint-disable react/no-unescaped-entities */
import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "TextField",
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  args: {
    className: "w-[16rem]",
    type: "text",
    defaultValue: "",
    placeholder: "Full name",
    disabled: false,
  },
  argTypes: { onChange: { action: "changed" } },
};
withFeatures(Playground, ["controls", "actions"]);

export const Types: Story = {
  render: function Render() {
    return (
      <div className="grid w-[28rem] grid-cols-2 items-center gap-[1rem]">
        <p className="font-[monospace]">type="date"</p>
        <TextField type="date" />
        <p className="font-[monospace]">type="datetime-local"</p>
        <TextField type="datetime-local" />
        <p className="font-[monospace]">type="email"</p>
        <TextField type="email" placeholder="Email" />
        <p className="font-[monospace]">type="file"</p>
        <TextField type="file" />
        <p className="font-[monospace]">type="month"</p>
        <TextField type="month" />
        <p className="font-[monospace]">type="number"</p>
        <TextField type="number" placeholder="Number" />
        <p className="font-[monospace]">type="password"</p>
        <TextField type="password" placeholder="Password" />
        <p className="font-[monospace]">type="search"</p>
        <TextField type="search" placeholder="Search" />
        <p className="font-[monospace]">type="tel"</p>
        <TextField type="tel" placeholder="Phone number" />
        <p className="font-[monospace]">type="text"</p>
        <TextField type="text" placeholder="Text" />
        <p className="font-[monospace]">type="time"</p>
        <TextField type="time" />
        <p className="font-[monospace]">type="url"</p>
        <TextField type="url" placeholder="URL" />
        <p className="font-[monospace]">type="week"</p>
        <TextField type="week" />
      </div>
    );
  },
};
withFeatures(Types, false);
