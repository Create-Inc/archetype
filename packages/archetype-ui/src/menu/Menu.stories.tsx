import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { withFeatures } from "../../.storybook/utils";
import { Button } from "../button";
import {
  luCloud,
  luCreditCard,
  luGithub,
  luKeyboard,
  luLifeBuoy,
  luLogOut,
  luMail,
  luMessageSquare,
  luPlus,
  luPlusCircle,
  luSettings,
  luUser,
  luUserPlus,
  luUsers,
} from "../icons";
import { Menu } from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Menu",
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Example: Story = {
  render: function Render() {
    return (
      <Menu>
        <Menu.Button className="mx-[5rem]">
          <Button variant="outline">Open menu</Button>
        </Menu.Button>
        <Menu.Popover className="min-w-[14rem]">
          <Menu.Heading>My account</Menu.Heading>
          <Menu.Separator />
          <Menu.Group>
            <Menu.Item icon={luUser} shortcut="⇧⌘P">
              Profile
            </Menu.Item>
            <Menu.Item icon={luCreditCard} shortcut="⌘B">
              Billing
            </Menu.Item>
            <Menu.Item icon={luSettings} shortcut="⌘S">
              Settings
            </Menu.Item>
            <Menu.Item icon={luKeyboard} shortcut="⌘K">
              Keyboard shortcuts
            </Menu.Item>
          </Menu.Group>
          <Menu.Separator />
          <Menu.Group>
            <Menu.Item icon={luUsers}>Team</Menu.Item>
            <Menu>
              <Menu.ItemSubmenu icon={luUserPlus}>
                Invite users
              </Menu.ItemSubmenu>
              <Menu.Popover>
                <Menu.Item icon={luMail}>Email</Menu.Item>
                <Menu.Item icon={luMessageSquare}>Message</Menu.Item>
                <Menu.Item icon={luPlusCircle}>More...</Menu.Item>
              </Menu.Popover>
            </Menu>
            <Menu.Item icon={luPlus} shortcut="⌘+T">
              New team
            </Menu.Item>
          </Menu.Group>
          <Menu.Separator />
          <Menu.Item icon={luGithub}>GitHub</Menu.Item>
          <Menu.Item icon={luLifeBuoy}>Support</Menu.Item>
          <Menu.Item disabled icon={luCloud}>
            API
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item icon={luLogOut} shortcut="⇧⌘Q">
            Log out
          </Menu.Item>
        </Menu.Popover>
      </Menu>
    );
  },
};
withFeatures(Example, false);

export const Radio: Story = {
  render: function Render() {
    return (
      <Menu defaultValues={{ view: "default" }}>
        <Menu.Button className="mx-[5rem]">
          <Button variant="outline">View</Button>
        </Menu.Button>
        <Menu.Popover>
          <Menu.ItemRadio name="view" value="compact">
            Compact
          </Menu.ItemRadio>
          <Menu.ItemRadio name="view" value="default">
            Default
          </Menu.ItemRadio>
          <Menu.ItemRadio name="view" value="comfortable">
            Comfortable
          </Menu.ItemRadio>
        </Menu.Popover>
      </Menu>
    );
  },
};
withFeatures(Radio, false);

export const Checkbox: Story = {
  render: function Render() {
    const [values, setValues] = useState({ watching: ["issues"] });
    return (
      <Menu
        values={values}
        setValues={(value: typeof values) => setValues(value)}
      >
        <Menu.Button className="mx-[5rem]">
          <Button variant="outline">
            {Array.isArray(values.watching) && values.watching.length > 0
              ? "Unwatch"
              : "Watch"}
          </Button>
        </Menu.Button>
        <Menu.Popover>
          <Menu.ItemCheckbox name="watching" value="issues">
            Issues
          </Menu.ItemCheckbox>
          <Menu.ItemCheckbox name="watching" value="pull-requests">
            Pull requests
          </Menu.ItemCheckbox>
          <Menu.ItemCheckbox name="watching" value="releases">
            Releases
          </Menu.ItemCheckbox>
          <Menu.ItemCheckbox name="watching" value="discussions">
            Discussions
          </Menu.ItemCheckbox>
          <Menu.ItemCheckbox name="watching" value="security-alerts">
            Security alerts
          </Menu.ItemCheckbox>
        </Menu.Popover>
      </Menu>
    );
  },
};
withFeatures(Checkbox, false);
