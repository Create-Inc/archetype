import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../button";
import { Label } from "../label";
import { TextField } from "../text-field";
import { Sheet, type SheetContentOptions, type SheetProps } from "./Sheet";

const meta: Meta<typeof Sheet> = {
  title: "Sheet",
  component: Sheet,
};

export default meta;
type Story = StoryObj<typeof Sheet>;

type Side = NonNullable<SheetContentOptions["side"]>;
const sides = ["left", "right", "top", "bottom"] as const;

export const Playground: Story = {
  render: function DialogExample(props: SheetProps) {
    const [side, setSide] = useState<Side>("right");
    return (
      <div className="space-y-[.5rem]">
        <label className="block space-x-[.5rem]">
          <span>Side:</span>
          <select
            value={side}
            onChange={(e) => setSide(e.target.value as Side)}
          >
            {sides.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <div>
          <Sheet {...props}>
            <Sheet.Disclosure>
              <Button variant="outline">Open</Button>
            </Sheet.Disclosure>
            <Sheet.Content side={side}>
              <Sheet.Header>
                <Sheet.Title>Edit profile</Sheet.Title>
                <Sheet.Description>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </Sheet.Description>
              </Sheet.Header>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <TextField
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <TextField
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <Sheet.Footer>
                <Sheet.Dismiss>
                  <Button type="submit">Save changes</Button>
                </Sheet.Dismiss>
              </Sheet.Footer>
            </Sheet.Content>
          </Sheet>
        </div>
      </div>
    );
  },
};
