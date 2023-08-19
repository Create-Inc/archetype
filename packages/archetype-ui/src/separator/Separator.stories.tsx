import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Separator",
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Example: Story = {
  render: function Render() {
    return (
      <div className="flex flex-col gap-[1rem] w-[20rem]">
        <div className="flex justify-center rounded border py-[2rem]">
          Some content...
        </div>
        <Separator />
        <div className="flex justify-center rounded border py-[2rem]">
          Some more content...
        </div>
      </div>
    );
  },
};
withFeatures(Example, false);

export const Vertical: Story = {
  render: function Render() {
    return (
      <div className="flex gap-[1rem] h-[4rem]">
        <div className="flex items-center rounded border px-[2rem]">
          Some content...
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center rounded border px-[2rem]">
          Some more content...
        </div>
      </div>
    );
  },
};
withFeatures(Vertical, false);
