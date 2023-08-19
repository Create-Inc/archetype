import * as Ariakit from "@ariakit/react";
import { type ComponentPropsWithRef, useRef, useState } from "react";

import { type ExtendedProps } from "../system";
import { type DataAttributes, mergeProps, useMergeRefs } from "./react";

export type UseFileDropZoneOptions = Pick<
  ComponentPropsWithRef<"div">,
  "onDragOver" | "onDrop" | "onDragLeave" | "onClick"
> & {
  /** Props passed to the root `<div />` element. */
  rootProps?: ComponentPropsWithRef<"div"> & DataAttributes;

  /** Props passed to the `<input type="file" />` element. */
  inputProps?: ComponentPropsWithRef<"input"> & DataAttributes;
};

/**
 * Utility to build a file drop zone component. Returns props that must be
 * passed to a `<div />`. It provides the following features:
 *
 * - Renders a hidden `<input type="file" />` internally.
 * - Forwards all props to the `<input type="file" />` element except for
 *   `className`, `style`, `children`, `onDragOver`, `onDrop`, `onDragLeave` and
 *   `onClick`, which are passed to the root `<div />`.
 * - Forwards props explicitly passed through `rootProps` and `inputProps`.
 * - Forwards the click event to the `<input type="file" />` element.
 * - Adds the `data-drag-active` attribute to the root `<div />`.
 */
export function useFileDropZone({
  className,
  style,
  children,
  onDragOver,
  onDrop,
  onDragLeave,
  onClick,
  rootProps,
  inputProps,
  ...props
}: ExtendedProps<
  "input",
  UseFileDropZoneOptions
>): ComponentPropsWithRef<"div"> & DataAttributes {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleOnDrop(event: React.DragEvent<HTMLDivElement>) {
    setDragActive(false);
    if (event.defaultPrevented) return;
    event.preventDefault();
    if (event.dataTransfer.items) {
      const fileItem = event.dataTransfer.items[0];
      if (!fileItem) return;
      if (fileItem.kind === "file") {
        const file = fileItem.getAsFile();
        if (file) {
          const dt = new DataTransfer();
          dt.items.add(file);

          const input = inputRef.current;
          if (input) {
            input.files = dt.files;
            // TODO: is this the right way to do this?
            if (props.onChange)
              props.onChange({
                ...event,
                currentTarget: input,
                target: input,
              });
          }
        }
      }
    }
  }

  return mergeProps(
    {
      onDragOver: (event: React.DragEvent) => {
        setDragActive(true);
        if (event.defaultPrevented) return;
        event.preventDefault();
      },
      onDrop: handleOnDrop,
      onDragLeave: () => setDragActive(false),
      onClick: () => inputRef.current?.click(),
      "data-drag-active": dragActive ? "" : undefined,
      children: (
        <>
          <Ariakit.VisuallyHidden>
            <input
              type="file"
              {...mergeProps(props, inputProps)}
              ref={useMergeRefs(inputRef, props.ref, inputProps?.ref)}
            />
          </Ariakit.VisuallyHidden>
          {children}
        </>
      ),
    },
    { className, style, onDragOver, onDrop, onDragLeave, onClick },
    rootProps
  );
}
