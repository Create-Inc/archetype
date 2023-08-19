import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Button } from "../button";
import { Label } from "../label";
import { Select } from "../select";
import { TextField } from "../text-field";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: { className: "w-[22rem]" },
  render: function Render(props) {
    return (
      <Card {...props}>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>
            Deploy your new project in one-click.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <TextField id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <Select>
                  <Select.Label>Framework</Select.Label>
                  <Select.Input></Select.Input>
                  <Select.Popover sameWidth>
                    <Select.Item value="Solid Start" />
                    <Select.Item value="Next.js" />
                    <Select.Item value="SvelteKit" />
                    <Select.Item value="Astro" />
                    <Select.Item value="Nuxt.js" />
                  </Select.Popover>
                </Select>
              </div>
            </div>
          </form>
        </Card.Content>
        <Card.Footer className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </Card.Footer>
      </Card>
    );
  },
};
withFeatures(Playground, ["controls"]);
