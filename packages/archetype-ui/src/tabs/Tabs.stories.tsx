import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Card } from "../card";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  args: {
    defaultSelectedId: "password",
  },
  render: function Render({ defaultSelectedId, ...props }) {
    return (
      <Tabs defaultSelectedId={defaultSelectedId} {...props}>
        <Tabs.List className="grid w-[25rem] grid-cols-2">
          <Tabs.Trigger id="account" value="account">
            Account
          </Tabs.Trigger>
          <Tabs.Trigger id="password" value="password">
            Password
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content tabId="account" className="w-[25rem]">
          <Card>
            <Card.Header>
              <Card.Title>Account</Card.Title>
              <Card.Description>
                Make changes to your account here. Click save when you&apos;re
                done.
              </Card.Description>
            </Card.Header>
            <Card.Footer>
              <Button>Save changes</Button>
            </Card.Footer>
          </Card>
        </Tabs.Content>
        <Tabs.Content tabId="password" className="w-[25rem]">
          <Card>
            <Card.Header>
              <Card.Title>Password</Card.Title>
              <Card.Description>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </Card.Description>
            </Card.Header>
            <Card.Footer>
              <Button>Save password</Button>
            </Card.Footer>
          </Card>
        </Tabs.Content>
      </Tabs>
    );
  },
};
