import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: {
    className: "",
    defaultChecked: false,
    disabled: false,
  },
  argTypes: { onChange: { action: "changed" } },
  parameters: {
    controls: { exclude: ["ref", "checkboxProps", "rootProps", "render"] },
  },
};
withFeatures(Playground, ["controls", "actions"]);

export const CheckboxWithLabel: Story = {
  args: {
    className: "",
    defaultChecked: false,
    disabled: false,
  },
  render: function Render(props) {
    return (
      <div className="items-top flex space-x-2">
        <Checkbox {...props} id="terms1" />
        <div className="leading-none grid gap-1.5">
          <label
            htmlFor="terms1"
            className="font-medium leading-none text-[.875rem] leading-[1.25rem] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p className="text-[.875rem] leading-[1.25rem] text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    );
  },
  argTypes: { onChange: { action: "changed" } },
  parameters: { controls: { exclude: ["ref", "checkboxProps", "rootProps"] } },
};
withFeatures(CheckboxWithLabel, ["controls", "actions"]);
