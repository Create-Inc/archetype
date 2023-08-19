import type { Meta, StoryObj } from "@storybook/react";

import { withIconControls } from "../../.storybook/utils";
import { Alert, type AlertProps } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
};

export default meta;
type Story = StoryObj<AlertProps & { title: string; description: string }>;

export const Playground: Story = {
  args: {
    className: "w-[28rem]",
    variant: "default",
    title: "Heads up!",
    description:
      "You can use the cli to configure the app globally in one simple command.",
  },
  render: function Render({ title, description, ...props }) {
    return (
      <Alert {...props}>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>{description}</Alert.Description>
      </Alert>
    );
  },
  argTypes: {
    title: { type: "string" },
    description: { type: "string" },
  },
};
withIconControls(Playground, ["icon"], {
  defaults: { icon: "luTerminal" },
});
