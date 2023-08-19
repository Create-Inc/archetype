import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Checkbox } from "../checkbox";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Label",
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {
  args: {
    className: "",
    children: "Accept terms and conditions",
    disabled: false,
  },
  render: function Render(props) {
    return (
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" disabled={props.disabled} />
          <Label {...props} htmlFor="terms" />
        </div>
      </div>
    );
  },
};
withFeatures(Playground, ["controls"]);
