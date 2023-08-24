/* eslint-disable react/no-unescaped-entities */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { withFeatures } from "../../.storybook/utils";
import { Button } from "../button";
import { Label } from "../label";
import { TextField } from "../text-field";
import { Dialog } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<{
  variant?: "dialog" | "sheet";
  side?: "left" | "right" | "top" | "bottom";
}>;

export const Playground: Story = {
  render: function Render({ variant, side }) {
    return (
      <Dialog>
        <Dialog.Disclosure>
          <Button variant="outline">Edit profile</Button>
        </Dialog.Disclosure>
        <Dialog.Content variant={variant} side={side}>
          <Dialog.Header>
            <Dialog.Heading>Edit profile</Dialog.Heading>
            <Dialog.Description>
              Make changes to your profile here. Click save when you're done.
            </Dialog.Description>
          </Dialog.Header>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <TextField
                id="name"
                placeholder="Diego Haz"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <TextField
                id="username"
                placeholder="@diegohaz"
                className="col-span-3"
              />
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Dismiss>
              <Button>Save changes</Button>
            </Dialog.Dismiss>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    );
  },
  args: {
    variant: "dialog",
    side: "right",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["dialog", "sheet"],
    },
    side: {
      control: "radio",
      options: ["right", "left", "top", "bottom"],
    },
  },
  parameters: { controls: { exclude: ["store", "children"] } },
};
withFeatures(Playground, ["controls"]);

export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open dialog
        </Button>
        <Dialog open={open} setOpen={setOpen}>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Heading>Edit profile</Dialog.Heading>
              <Dialog.Description>
                Make changes to your profile here. Click save when you're done.
              </Dialog.Description>
            </Dialog.Header>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <TextField
                  id="name"
                  placeholder="Diego Haz"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <TextField
                  id="username"
                  placeholder="@diegohaz"
                  className="col-span-3"
                />
              </div>
            </div>
            <Dialog.Footer>
              <Dialog.Dismiss>
                <Button>Save changes</Button>
              </Dialog.Dismiss>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog>
      </>
    );
  },
};
withFeatures(Controlled, false);
