import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Button } from "../button";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Tooltip",
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Example: Story = {
  render: function Render() {
    return (
      <div className="flex gap-[1rem]">
        <Tooltip content="Tooltip">
          <div className="rounded border p-[1rem]">Tooltip trigger</div>
        </Tooltip>
        <Tooltip content="Tooltip">
          <div className="rounded border p-[1rem]">Tooltip trigger</div>
        </Tooltip>
        <Tooltip content="Tooltip">
          <div className="rounded border p-[1rem]">Tooltip trigger</div>
        </Tooltip>
        <Tooltip content="Tooltip">
          <div className="rounded border p-[1rem]">Tooltip trigger</div>
        </Tooltip>
      </div>
    );
  },
};
withFeatures(Example, false);

export const ButtonAsTrigger: Story = {
  render: function Render() {
    return (
      <div className="flex gap-[1rem]">
        <Tooltip content="Tooltip">
          <Button>Hover or focus me!</Button>
        </Tooltip>
        <Tooltip content="Tooltip">
          <Button>Hover or focus me!</Button>
        </Tooltip>
        <Tooltip content="Tooltip">
          <Button>Hover or focus me!</Button>
        </Tooltip>
      </div>
    );
  },
};
withFeatures(ButtonAsTrigger, false);
