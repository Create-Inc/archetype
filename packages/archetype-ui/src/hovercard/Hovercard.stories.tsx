import type { Meta, StoryObj } from "@storybook/react";

import { withFeatures } from "../../.storybook/utils";
import { Button } from "../button";
import { Icon } from "../icon";
import { luCalendarDays } from "../icons";
import { Hovercard } from "./Hovercard";

const meta: Meta<typeof Hovercard> = {
  title: "Hovercard",
  component: Hovercard,
};

export default meta;
type Story = StoryObj<typeof Hovercard>;

export const Example: Story = {
  render: function Render(props) {
    return (
      <div className="w-[24rem] flex justify-center">
        <Hovercard {...props}>
          <Hovercard.Anchor>
            <Button
              as="a"
              variant="link"
              href="https://twitter.com/daniguardio_la"
              target="_blank"
            >
              @daniguardio_la
            </Button>
          </Hovercard.Anchor>
          <Hovercard.Popover className="w-[20rem]">
            <div className="flex justify-between space-x-4">
              <section className="space-y-1">
                <h1 className="text-[.875rem] font-[600] leading-[1.25rem]">
                  @daniguardio_la
                </h1>
                <p className="text-[.875rem] leading-[1.25rem]">
                  Software, math, and physics - pixel agitator and LLM whisperer
                  at @create_xyz - he/him
                </p>
                <div className="flex items-center pt-[0.5rem] gap-2">
                  <Icon
                    icon={luCalendarDays}
                    className="mr-[0.5rem] h-[1rem] w-[1rem] opacity-70"
                  />
                  <span className="text-[.75rem] leading-[1rem] text-muted-foreground">
                    Joined July 2020
                  </span>
                </div>
              </section>
            </div>
          </Hovercard.Popover>
        </Hovercard>
      </div>
    );
  },
};
withFeatures(Example, false);
