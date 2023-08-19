import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { ContextMenu } from "./ContextMenu";
import { Menu } from "./Menu";

const meta: Meta<typeof ContextMenu> = {
  title: "ContextMenu",
  component: ContextMenu,
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Example: Story = {
  render: function Render() {
    const contextMenu = ContextMenu.useStore({
      defaultValues: { bookmarks: true, people: "diego-haz" },
    });
    const { targetProps, menuPopoverProps } =
      ContextMenu.useContextMenu(contextMenu);
    return (
      <>
        <div {...targetProps} className="inline-block rounded border p-[4rem]">
          Right click here...
        </div>
        <ContextMenu store={contextMenu}>
          <Menu.Popover {...menuPopoverProps} inset className="min-w-[14rem]">
            <Menu.Group>
              <Menu.Item shortcut="⌘[">Back</Menu.Item>
              <Menu.Item shortcut="⌘]">Forward</Menu.Item>
              <Menu.Item shortcut="⌘R">Reload</Menu.Item>
              <Menu>
                <Menu.ItemSubmenu>More tools</Menu.ItemSubmenu>
                <Menu.Popover>
                  <Menu.Item shortcut="⇧⌘S">Save page as...</Menu.Item>
                  <Menu.Item>Create shortcut...</Menu.Item>
                  <Menu.Item>Name window...</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item>Developer tools</Menu.Item>
                </Menu.Popover>
              </Menu>
            </Menu.Group>
            <Menu.Separator />
            <Menu.Group>
              <Menu.ItemCheckbox name="bookmarks" shortcut="⌘⇧B">
                Show bookmarks bar
              </Menu.ItemCheckbox>
              <Menu.ItemCheckbox name="show-urls">
                Show full URLs
              </Menu.ItemCheckbox>
            </Menu.Group>
            <Menu.Separator />
            <Menu.Heading>People</Menu.Heading>
            <Menu.Group>
              <Menu.ItemRadio name="people" value="diego-haz">
                Diego Haz
              </Menu.ItemRadio>
              <Menu.ItemRadio name="people" value="dani-guardiola">
                Dani Guardiola
              </Menu.ItemRadio>
            </Menu.Group>
          </Menu.Popover>
        </ContextMenu>
      </>
    );
  },
};
withFeatures(Example, false);
