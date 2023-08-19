import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures, withIconControls } from "../../.storybook/utils";
import * as icons from "../icons";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Icon",
  component: Icon,
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  render: function Render(props) {
    return (
      <div className="[.dark_&]:text-white [.light_&]:text-black">
        <Icon {...props} />
      </div>
    );
  },
  args: { className: "" },
};
withIconControls(Playground, "icon", {
  defaults: { icon: "luRocket" },
  required: true,
});
withFeatures(Playground, "controls");

export const AllIcons: Story = {
  render: function Render(props) {
    return (
      <div className="grid max-w-[50rem] grid-cols-4 gap-[2rem] transition-colors [.dark_&]:text-white [.light_&]:text-black">
        {Object.entries(icons).map(([name, data]) => (
          <div
            key={name}
            className="col-span-1 flex flex-col items-center gap-[.5rem]"
          >
            <Icon {...props} icon={data} />
            <p className="text-body-md max-w-full break-words">{name}</p>
          </div>
        ))}
      </div>
    );
  },
  args: { className: "w-[2.5rem] h-[2.5rem]" },
  parameters: { controls: { exclude: ["ref", "icon"] } },
};
withFeatures(AllIcons, "controls");
