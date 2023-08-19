import { AtRule, type Root } from "postcss";

import { type PluginOptionsWithDefaults } from "../options";

export function applyLayer(
  rootNode: Root,
  { layer }: PluginOptionsWithDefaults
) {
  const layerNode = new AtRule({ name: "layer", params: layer });
  layerNode.append(...rootNode.nodes);
  rootNode.removeAll();
  rootNode.append(layerNode);
}
