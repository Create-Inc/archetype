import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Label } from "../label";
import { TextField } from "../text-field";
import { Dialog, type DialogProps } from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Playground: Story = {
  render: function DialogExample(props: DialogProps) {
    return (
      <Dialog {...props}>
        <Dialog.Disclosure>
          <Button variant="outline">Edit Profile</Button>
        </Dialog.Disclosure>
        <Dialog.Content className="sm:max-w-[425px]">
          <Dialog.Heading>
            <>
              <Dialog.Title>Edit profile</Dialog.Title>
              <Dialog.Description>
                <p>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </p>
              </Dialog.Description>
            </>
          </Dialog.Heading>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <TextField
                id="name"
                placeholder="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <TextField
                id="username"
                placeholder="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <Dialog.Footer>
            <Dialog.Dismiss>
              <Button type="submit">Save changes</Button>
            </Dialog.Dismiss>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    );
  },
};
