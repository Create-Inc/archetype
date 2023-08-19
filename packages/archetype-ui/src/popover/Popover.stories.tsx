import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Label } from "../label";
import { TextField } from "../text-field";
import { Popover } from "./Popover";

const meta: Meta<typeof Popover> = {
  title: "Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Playground: Story = {
  render: function Render() {
    return (
      <Popover>
        <Popover.Disclosure>
          <Button variant="outline">Open popover</Button>
        </Popover.Disclosure>
        <Popover.Content className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <TextField
                  id="width"
                  defaultValue="100%"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <TextField
                  id="maxWidth"
                  defaultValue="300px"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Height</Label>
                <TextField
                  id="height"
                  defaultValue="25px"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Max. height</Label>
                <TextField
                  id="maxHeight"
                  defaultValue="none"
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );
  },
};
