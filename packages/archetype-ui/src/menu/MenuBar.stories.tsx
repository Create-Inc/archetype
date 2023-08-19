import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Menu } from "./Menu";
import { MenuBar } from "./MenuBar";

const meta: Meta<typeof MenuBar> = {
  title: "MenuBar",
  component: MenuBar,
};

export default meta;
type Story = StoryObj<typeof MenuBar>;

export const Example: Story = {
  render: function Render() {
    return (
      <MenuBar>
        <Menu>
          <MenuBar.Button>File</MenuBar.Button>
          <Menu.Popover>
            <Menu.Item shortcut="⌘T">New Tab</Menu.Item>
            <Menu.Item shortcut="⌘N">New Window</Menu.Item>
            <Menu.Item disabled>New Incognito Window</Menu.Item>
            <Menu.Separator />
            <Menu>
              <Menu.ItemSubmenu>Share</Menu.ItemSubmenu>
              <Menu.Popover>
                <Menu.Item>Email link</Menu.Item>
                <Menu.Item>Messages</Menu.Item>
                <Menu.Item>Notes</Menu.Item>
              </Menu.Popover>
            </Menu>
            <Menu.Separator />
            <Menu.Item shortcut="⌘P">Print...</Menu.Item>
          </Menu.Popover>
        </Menu>
        <Menu>
          <MenuBar.Button>Edit</MenuBar.Button>
          <Menu.Popover>
            <Menu.Item shortcut="⌘Z">Undo</Menu.Item>
            <Menu.Item shortcut="⇧⌘Z">Redo</Menu.Item>
            <Menu.Separator />
            <Menu>
              <Menu.ItemSubmenu>Find</Menu.ItemSubmenu>
              <Menu.Popover>
                <Menu.Item>Search the web</Menu.Item>
                <Menu.Separator />
                <Menu.Item>Find...</Menu.Item>
                <Menu.Item>Find Next</Menu.Item>
                <Menu.Item>Find Previous</Menu.Item>
              </Menu.Popover>
            </Menu>
            <Menu.Separator />
            <Menu.Item>Cut</Menu.Item>
            <Menu.Item>Copy</Menu.Item>
            <Menu.Item>Paste</Menu.Item>
          </Menu.Popover>
        </Menu>
        <Menu defaultValues={{ "show-urls": true }}>
          <MenuBar.Button>View</MenuBar.Button>
          <Menu.Popover inset>
            <Menu.ItemCheckbox name="bookmarks">
              Always Show Bookmarks Bar
            </Menu.ItemCheckbox>
            <Menu.ItemCheckbox name="show-urls">
              Always Show Full URLs
            </Menu.ItemCheckbox>
            <Menu.Separator />
            <Menu.Item shortcut="⌘R">Reload</Menu.Item>
            <Menu.Item shortcut="⌘⇧R" disabled>
              Force Reload
            </Menu.Item>
            <Menu.Separator />
            <Menu.Item>Toggle Fullscreen</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Hide Sidebar</Menu.Item>
          </Menu.Popover>
        </Menu>
        <Menu defaultValues={{ profiles: "diego" }}>
          <MenuBar.Button>Profiles</MenuBar.Button>
          <Menu.Popover inset>
            <Menu.ItemRadio name="profiles" value="dani">
              Dani
            </Menu.ItemRadio>
            <Menu.ItemRadio name="profiles" value="lukas">
              Lukas
            </Menu.ItemRadio>
            <Menu.ItemRadio name="profiles" value="diego">
              Diego
            </Menu.ItemRadio>
            <Menu.Separator />
            <Menu.Item>Edit...</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Add Profile...</Menu.Item>
          </Menu.Popover>
        </Menu>
      </MenuBar>
    );
  },
};
withFeatures(Example, false);
