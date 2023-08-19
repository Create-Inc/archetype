import "./FileDropZone.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
  useFileDropZone,
  type UseFileDropZoneOptions,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("FileDropZone");

/**
 * A file drop zone. Extends `<input type="file" />`. Rendered as `<div />`.
 *
 * Renders a hidden `<input type="file" />` internally.
 *
 * All props are forwarded to the `<input type="file" />` except `className`,
 * `style`, `children`, `onDragOver`, `onDrop`, `onDragLeave` and `onClick`,
 * which are passed to the root `<div />`.
 *
 * Props can also be explicitly passed via `rootProps` and `inputProps`.
 *
 * @example
 *
 * ```tsx
 * const [file, setFile] = useState<File>();
 * <FileDropZone
 *   className="min-h-[10rem]"
 *   onChange={(e) => {
 *     const file = e.target.files?.[0];
 *     setFile(file);
 *   }}
 * >
 *   <p className="shrink truncate">
 *     {file ? file?.name : "Drop or select a file"}
 *   </p>
 * </FileDropZone>;
 * ```
 */
export const FileDropZone: Component<FileDropZoneProps> = createComponent(
  (props) => {
    const divProps = useFileDropZone(props);
    return (
      <div {...divProps} className={clsx(styles.zone, divProps.className)} />
    );
  }
);

/** `FileDropZone` options. */
export type FileDropZoneOptions = UseFileDropZoneOptions;

/** `FileDropZone` props. */
export type FileDropZoneProps = ExtendedProps<"input", FileDropZoneOptions>;
