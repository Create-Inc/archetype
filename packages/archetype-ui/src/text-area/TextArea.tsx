import "./TextArea.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("TextArea");

/**
 * A multi-line text field. Rendered as `<textarea />`.
 *
 * @example
 *
 * ```tsx
 * <TextArea placeholder="What is happening?!" />;
 * ```
 *
 * ```tsx
 * // uncontrolled
 * <TextArea defaultValue="Default text" />;
 * ```
 *
 * @example
 *
 * ```tsx
 * // controlled
 * const [value, setValue] = useState("Default text");
 * <TextArea
 *   value={value}
 *   onChange={(event) => setValue(event.target.value)}
 * />;
 * ```
 */
export const TextArea: Component<TextAreaProps> = createComponent((props) => (
  <textarea {...props} className={clsx(styles.textarea, props.className)} />
));

/** `TextArea` props. */
export type TextAreaProps = ExtendedProps<"textarea">;
