export function noFalsy<T>(value: T | false | null | undefined): value is T {
  return Boolean(value);
}
