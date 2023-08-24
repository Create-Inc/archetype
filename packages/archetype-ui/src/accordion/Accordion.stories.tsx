/* eslint-disable react/no-unescaped-entities */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { withFeatures } from "../../.storybook/utils";
import { Accordion, type AccordionValue } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Playground: Story = {
  render: function AccordionDemo(props) {
    return (
      <div className="flex h-[30rem] items-center justify-center">
        <Accordion {...props}>
          <Accordion.Item>
            <Accordion.Trigger value="accessible">
              Is it accessible?
            </Accordion.Trigger>
            <Accordion.Content>
              No. It unfortunately doesn't adhere to the WAI-ARIA design pattern
              yet. We're waiting for Ariakit support.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Trigger value="styled">Is it styled?</Accordion.Trigger>
            <Accordion.Content>
              Yes. It comes with default styles that matches the other
              components' aesthetic.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Trigger value="animated">
              Is it animated?
            </Accordion.Trigger>
            <Accordion.Content>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
  args: {
    className: "w-[30rem]",
    defaultValue: undefined,
    animated: true,
  },
  parameters: {
    controls: {
      exclude: ["render", "value", "setValue", "store", "storeProps", "ref"],
    },
  },
};
withFeatures(Playground, ["controls"]);

export const Multiple: Story = {
  ...Playground,
  args: {
    ...Playground.args,
    defaultValue: ["accessible", "styled"],
  },
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<AccordionValue>("styled");
    return (
      <div className="flex h-[30rem] items-center justify-center">
        <Accordion value={value} setValue={setValue} className="w-[30rem]">
          <Accordion.Item>
            <Accordion.Trigger value="accessible">
              Is it accessible?
            </Accordion.Trigger>
            <Accordion.Content>
              No. It unfortunately doesn't adhere to the WAI-ARIA design pattern
              yet. We're waiting for Ariakit support.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Trigger value="styled">Is it styled?</Accordion.Trigger>
            <Accordion.Content>
              Yes. It comes with default styles that matches the other
              components' aesthetic.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Trigger value="animated">
              Is it animated?
            </Accordion.Trigger>
            <Accordion.Content>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
};
withFeatures(Controlled, false);
