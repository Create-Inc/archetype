import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { withFeatures } from "../../.storybook/utils";
import { Select, type SelectValue } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
};

export default meta;
type Story = StoryObj<{ className: string }>;

export const Playground: Story = {
  render: function Render(props) {
    return (
      <div className="space-y-[.5rem]">
        <Select defaultValue="blueberry">
          <Select.Label>Favorite fruit</Select.Label>
          <Select.Input {...props} />
          <Select.Popover>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="blueberry">Blueberry</Select.Item>
            <Select.Item value="cherry" disabled>
              Cherry
            </Select.Item>
            <Select.Item value="nectarine">Nectarine</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="peach" disabled>
              Peach
            </Select.Item>
            <Select.Item value="pear">Pear</Select.Item>
            <Select.Item value="plum">Plum</Select.Item>
            <Select.Item value="strawberry">Strawberry</Select.Item>
          </Select.Popover>
        </Select>
      </div>
    );
  },
  args: { className: "max-w-[12rem]" },
  parameters: { controls: { exclude: ["store"] } },
};
withFeatures(Playground, ["controls"]);

export const GroupsAndSeparators: Story = {
  render: function Render(props) {
    return (
      <div className="space-y-[.5rem]">
        <Select defaultValue="broccoli">
          <Select.Label>Favorite food</Select.Label>
          <Select.Input {...props} />
          <Select.Popover>
            <Select.Group>
              <Select.GroupLabel>Fruits</Select.GroupLabel>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="blueberry">Blueberry</Select.Item>
              <Select.Item value="cherry" disabled>
                Cherry
              </Select.Item>
              <Select.Item value="nectarine">Nectarine</Select.Item>
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Item value="peach" disabled>
                Peach
              </Select.Item>
              <Select.Item value="pear">Pear</Select.Item>
              <Select.Item value="plum">Plum</Select.Item>
              <Select.Item value="strawberry">Strawberry</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.GroupLabel>Vegetables</Select.GroupLabel>
              <Select.Item value="asparagus">Asparagus</Select.Item>
              <Select.Item value="broccoli">Broccoli</Select.Item>
              <Select.Item value="carrot" disabled>
                Carrot
              </Select.Item>
              <Select.Item value="celery" disabled>
                Celery
              </Select.Item>
              <Select.Item value="corn">Corn</Select.Item>
              <Select.Item value="lettuce">Lettuce</Select.Item>
              <Select.Item value="onion">Onion</Select.Item>
              <Select.Item value="potato">Potato</Select.Item>
              <Select.Item value="tomato">Tomato</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.GroupLabel>Grains</Select.GroupLabel>
              <Select.Item value="bread">Bread</Select.Item>
              <Select.Item value="cereal">Cereal</Select.Item>
              <Select.Item value="pasta">Pasta</Select.Item>
              <Select.Item value="rice">Rice</Select.Item>
            </Select.Group>
          </Select.Popover>
        </Select>
      </div>
    );
  },
  args: { className: "max-w-[12rem]" },
  parameters: { controls: { exclude: ["store"] } },
};
withFeatures(GroupsAndSeparators, ["controls"]);

export const Placeholder: Story = {
  render: function Render(props) {
    return (
      <div className="space-y-[.5rem]">
        <Select>
          <Select.Label>Email</Select.Label>
          <Select.Input
            placeholder="Select a verified email to display"
            {...props}
          />
          <Select.Popover>
            <Select.Item value="hi@dio.la" />
            <Select.Item value="hi@daniguardio.la" />
            <Select.Item value="dani@create.xyz" />
          </Select.Popover>
        </Select>
      </div>
    );
  },
  args: { className: "max-w-[18rem]" },
  parameters: { controls: { exclude: ["store"] } },
};
withFeatures(Placeholder, ["controls"]);

export const Multiple: Story = {
  render: function Render(props) {
    return (
      <div className="space-y-[.5rem]">
        <Select defaultValue={["broccoli", "apple"]}>
          <Select.Label>Favorite foods</Select.Label>
          <Select.Input {...props} />
          <Select.Popover>
            <Select.Group>
              <Select.GroupLabel>Fruits</Select.GroupLabel>
              <Select.Item value="apple">Apple</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
              <Select.Item value="blueberry">Blueberry</Select.Item>
              <Select.Item value="cherry" disabled>
                Cherry
              </Select.Item>
              <Select.Item value="nectarine">Nectarine</Select.Item>
              <Select.Item value="orange">Orange</Select.Item>
              <Select.Item value="peach" disabled>
                Peach
              </Select.Item>
              <Select.Item value="pear">Pear</Select.Item>
              <Select.Item value="plum">Plum</Select.Item>
              <Select.Item value="strawberry">Strawberry</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.GroupLabel>Vegetables</Select.GroupLabel>
              <Select.Item value="asparagus">Asparagus</Select.Item>
              <Select.Item value="broccoli">Broccoli</Select.Item>
              <Select.Item value="carrot" disabled>
                Carrot
              </Select.Item>
              <Select.Item value="celery" disabled>
                Celery
              </Select.Item>
              <Select.Item value="corn">Corn</Select.Item>
              <Select.Item value="lettuce">Lettuce</Select.Item>
              <Select.Item value="onion">Onion</Select.Item>
              <Select.Item value="potato">Potato</Select.Item>
              <Select.Item value="tomato">Tomato</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.GroupLabel>Grains</Select.GroupLabel>
              <Select.Item value="bread">Bread</Select.Item>
              <Select.Item value="cereal">Cereal</Select.Item>
              <Select.Item value="pasta">Pasta</Select.Item>
              <Select.Item value="rice">Rice</Select.Item>
            </Select.Group>
          </Select.Popover>
        </Select>
      </div>
    );
  },
  args: { className: "max-w-[12rem]" },
  parameters: { controls: { exclude: ["store"] } },
};
withFeatures(Multiple, ["controls"]);

export const Controlled: Story = {
  render: function Render(props) {
    const [value, setValue] = useState<SelectValue>("blueberry");
    return (
      <div className="space-y-[.5rem]">
        <Select value={value} setValue={setValue}>
          <Select.Label>Favorite fruit</Select.Label>
          <Select.Input {...props} />
          <Select.Popover>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="blueberry">Blueberry</Select.Item>
            <Select.Item value="cherry" disabled>
              Cherry
            </Select.Item>
            <Select.Item value="nectarine">Nectarine</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="peach" disabled>
              Peach
            </Select.Item>
            <Select.Item value="pear">Pear</Select.Item>
            <Select.Item value="plum">Plum</Select.Item>
            <Select.Item value="strawberry">Strawberry</Select.Item>
          </Select.Popover>
        </Select>
      </div>
    );
  },
  args: { className: "max-w-[12rem]" },
  parameters: { controls: { exclude: ["store"] } },
};
withFeatures(Controlled, ["controls"]);

export const AutoSelectFirstItem: Story = {
  render: function Render(props) {
    return (
      <div className="space-y-[.5rem]">
        <Select defaultValue={undefined}>
          <Select.Label>Favorite fruit</Select.Label>
          <Select.Input {...props} />
          <Select.Popover>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="blueberry">Blueberry</Select.Item>
            <Select.Item value="cherry" disabled>
              Cherry
            </Select.Item>
            <Select.Item value="nectarine">Nectarine</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
            <Select.Item value="peach" disabled>
              Peach
            </Select.Item>
            <Select.Item value="pear">Pear</Select.Item>
            <Select.Item value="plum">Plum</Select.Item>
            <Select.Item value="strawberry">Strawberry</Select.Item>
          </Select.Popover>
        </Select>
      </div>
    );
  },
  args: { className: "max-w-[12rem]" },
  parameters: { controls: { exclude: ["store"] } },
};
withFeatures(AutoSelectFirstItem, ["controls"]);
