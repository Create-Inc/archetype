import {
  type Component,
  createComponent,
  type ExtendedProps,
} from "@createinc/archetype";

import { TextField, type TextFieldProps } from "./TextField";

const DEFAULT_PROPS = {
  type: "file",
} as const; // satisfies Partial<TextFieldProps>

/**
 * A file input field. Extends `<TextField />`. Rendered as `<input type="file"
 * />`.
 *
 * @example
 *
 * ```tsx
 * const [file, setFile] = useState<File>();
 * <FileInput
 *   value={file}
 *   onChange={(event) => setFile(event.target.files[0])}
 * />;
 * ```
 */
export const FileInput: Component<FileInputProps> = createComponent(
  ({ type = DEFAULT_PROPS.type, ...props }) => (
    <TextField type={type} {...props} />
  )
);

/** `FileInput` props. */
export type FileInputProps = ExtendedProps<TextFieldProps>;
