export * from "./generate-docs";
export * from "./introspect-system";

// TODO:
// - generate docs for hook signatures
// - normalize JSDoc descriptions (remove single newlines)
// - normalize examples (strip code block indicators when present)
// - pluralize "examples" heading (use only "example" when there's only one)
// - format generated markdown with prettier
// - handle other tags better (e.g. "@see")
// - format code examples with prettier
// - handle undefined descriptions
// - figure out what to do with long Ariakit-imported options (e.g. Menu store props)
// - general cleanup!
