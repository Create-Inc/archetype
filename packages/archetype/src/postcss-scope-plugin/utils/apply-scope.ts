import { type Root } from "postcss";

import { type PluginOptionsWithDefaults } from "../options";
import { applyClassScoping } from "./apply-class-scoping";
import { applyLayer } from "./apply-layer";

const SCOPE_FROM_FILE_NAME_REGEXP = /\/(?<scope>[a-zA-Z0-9_-]+)\.scoped\.css$/;

export function applyScope(rootNode: Root, options: PluginOptionsWithDefaults) {
  // get scope name
  const filePath = rootNode.source?.input.file;
  const scope = filePath?.match(SCOPE_FROM_FILE_NAME_REGEXP)?.groups?.scope;
  if (!scope) return;

  // apply class scoping and layer
  applyClassScoping(rootNode, scope, options);
  applyLayer(rootNode, options);
}
