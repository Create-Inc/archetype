import "./TextField.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("TextField");

const DEFAULT_PROPS = {
  type: "text",
} as const; // satisfies Partial<TextFieldProps>

/**
 * A text input field. Rendered as `<input type="text" />`.
 *
 * @example
 *
 * ```tsx
 * <TextField placeholder="Full name" />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // uncontrolled
 * <TextField defaultValue="Default text" />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // controlled
 * const [value, setValue] = useState("Default text");
 * <TextField
 *   value={value}
 *   onChange={(event) => setValue(event.target.value)}
 * />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // different types
 * <TextField type="email" placeholder="Email" />;
 * <TextField type="password" placeholder="Password" />;
 * <TextField type="number" placeholder="Number" />;
 * ```
 */
export const TextField: Component<TextFieldProps> = createComponent(
  ({ type = DEFAULT_PROPS.type, ...props }) => (
    <input
      type={type}
      {...props}
      className={clsx(styles.input, props.className)}
    />
  )
);

/** `TextField` props. */
export type TextFieldProps = ExtendedProps<"input">;
