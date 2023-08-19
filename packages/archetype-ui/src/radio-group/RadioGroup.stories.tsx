import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { withAction, withFeatures } from "../../.storybook/utils";
import { Label } from "../label";
import { RadioGroup, type RadioGroupValue } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "RadioGroup",
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Example: Story = {
  render: function Render() {
    return (
      <RadioGroup>
        <RadioGroup.LabelledRadio value="default">
          Default
        </RadioGroup.LabelledRadio>
        <RadioGroup.LabelledRadio value="comfortable">
          Comfortable
        </RadioGroup.LabelledRadio>
        <RadioGroup.LabelledRadio value="compact">
          Compact
        </RadioGroup.LabelledRadio>
      </RadioGroup>
    );
  },
};
withFeatures(Example, false);

export const DefaultValue: Story = {
  render: function Render() {
    return (
      <RadioGroup storeProps={{ defaultValue: "default" }}>
        <RadioGroup.LabelledRadio value="default">
          Default
        </RadioGroup.LabelledRadio>
        <RadioGroup.LabelledRadio value="comfortable">
          Comfortable
        </RadioGroup.LabelledRadio>
        <RadioGroup.LabelledRadio value="compact">
          Compact
        </RadioGroup.LabelledRadio>
      </RadioGroup>
    );
  },
};
withFeatures(DefaultValue, false);

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<RadioGroupValue>("default");
    return (
      <RadioGroup
        storeProps={{
          value,
          setValue: withAction("value set", setValue), // (storybook action)
        }}
      >
        <RadioGroup.LabelledRadio value="default">
          Default
        </RadioGroup.LabelledRadio>
        <RadioGroup.LabelledRadio value="comfortable">
          Comfortable
        </RadioGroup.LabelledRadio>
        <RadioGroup.LabelledRadio value="compact">
          Compact
        </RadioGroup.LabelledRadio>
      </RadioGroup>
    );
  },
};
withFeatures(Controlled, ["actions"]);

export const Disabled: Story = {
  render: function Render() {
    return (
      <RadioGroup storeProps={{ defaultValue: "default" }}>
        <RadioGroup.LabelledRadio value="default">
          Default
        </RadioGroup.LabelledRadio>
        <RadioGroup.LabelledRadio value="comfortable" disabled>
          Comfortable
        </RadioGroup.LabelledRadio>
        <RadioGroup.LabelledRadio value="compact" disabled>
          Compact
        </RadioGroup.LabelledRadio>
      </RadioGroup>
    );
  },
};
withFeatures(Disabled, false);

export const ManualLabels: Story = {
  render: function Render() {
    return (
      <RadioGroup>
        <div className="flex items-center gap-2">
          <RadioGroup.Radio id="default" value="default" />
          <Label htmlFor="default">Default</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroup.Radio id="comfortable" value="comfortable" disabled />
          <Label htmlFor="comfortable" disabled>
            Comfortable
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroup.Radio id="compact" value="compact" />
          <Label htmlFor="compact">Compact</Label>
        </div>
      </RadioGroup>
    );
  },
};
withFeatures(ManualLabels, false);
