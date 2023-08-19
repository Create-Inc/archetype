import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Icon } from "../icon";
import { luChevronsUpDown } from "../icons";
import { Collapsible } from "./Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Collapsible",
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Playground: Story = {
  render: function Render() {
    return (
      <div className="w-[350px] space-y-2">
        <Collapsible>
          <div className="flex items-center justify-between space-x-4 px-4">
            <h4 className="text-sm font-semibold">
              @create-inc starred 3 repositories
            </h4>
            <Collapsible.Trigger>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <Icon icon={luChevronsUpDown} className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </Collapsible.Trigger>
          </div>
          <div className="font-mono text-sm rounded-md border px-4 py-3">
            @archtype-ui/Collapsible
          </div>
          <Collapsible.Content className="space-y-2">
            <div className="font-mono text-sm rounded-md border px-4 py-3">
              @archtype-ui/Button
            </div>
            <div className="font-mono text-sm rounded-md border px-4 py-3">
              @archtype-io/Switch
            </div>
          </Collapsible.Content>
        </Collapsible>
      </div>
    );
  },
  args: {},
  argTypes: {},
};
