import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { withAction, withFeatures } from "../../.storybook/utils";
import { Icon } from "../icon";
import { luFile } from "../icons";
import { FileDropZone } from "./FileDropZone";

const meta: Meta<typeof FileDropZone> = {
  title: "FileDropZone",
  component: FileDropZone,
};

export default meta;

type Story = StoryObj<typeof FileDropZone>;

export const Playground: Story = {
  args: { className: "max-w-[20rem] min-h-[10rem]" },
  render: function Render(props) {
    const [file, _setFile] = useState<File>();
    const setFile = withAction("file set", _setFile); // storybook action
    return (
      <FileDropZone
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFile(file);
        }}
        {...props}
      >
        <div className="flex gap-2 overflow-hidden">
          <Icon icon={luFile} />
          <span className="shrink truncate">
            {file ? file?.name : "Drop or select a file"}
          </span>
        </div>
      </FileDropZone>
    );
  },
};
withFeatures(Playground, ["actions", "controls"]);
