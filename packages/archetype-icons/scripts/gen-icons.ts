/* eslint-disable @typescript-eslint/no-non-null-assertion */
import console from "node:console";
import fs from "node:fs/promises";
import path from "node:path";
import * as url from "node:url";

import { type ICON_SIZE_ESCAPE_SEQUENCE as IconSizeEscapeSequence } from "@createinc/archetype";
import { ESLint } from "eslint";
import pacote from "pacote";
import prettier from "prettier";
import { type IconTree } from "react-icons";
import { temporaryDirectory } from "tempy";

const scriptDirPath = url.fileURLToPath(new URL(".", import.meta.url));

// hack to get around non-ESM lodash error but still make sure these
// values are the same
const ICON_SIZE_ESCAPE_SEQUENCE: typeof IconSizeEscapeSequence = "123.45";

const DEST_PATH = path.resolve(scriptDirPath, "../src");

const IGNORED_FAMILIES = ["lib", "wi"];
const IGNORED_ICONS = [
  "fcLinux",
  "vscCircleSmallFilled",
  "vscDebugStackframeActive",
  "vscDebugStackframe",
  "vscKebabVertical",
  "vscRecordKeys",
  "ciSearch",
];

const ICON_DATA_REGEXP =
  /function (?<name>[a-zA-Z0-9]+) \(props\) {\n\s+return GenIcon\((?<data>.*)\)\(props\);/g;
const VIEW_BOX_REGEXP =
  /^(?<minX>[0-9]+) (?<minY>[0-9]+) (?<width>[0-9]+) (?<height>[0-9]+)$/;

async function extractIconDataFromFile(filePath: string) {
  const fileData = await fs.readFile(filePath, "utf-8");
  const matches = fileData.matchAll(ICON_DATA_REGEXP);

  const iconData: { name: string; data: IconTree }[] = [];

  for (const match of matches) {
    const { name, data } = match.groups!;
    const formattedName = name.charAt(0).toLowerCase() + name.slice(1);

    if (IGNORED_ICONS.includes(formattedName)) continue;

    iconData.push({ name: formattedName, data: JSON.parse(data) as IconTree });
  }

  return iconData;
}

const unexpectedError = (name: string) =>
  new Error(
    `Something unexpected was found while transforming the "${name}" icon`
  );

const FLAT_SVG_ATTRS = ["viewBox", "version", "fill", "aria-hidden"];
const FLAT_PATH_ATTRS = ["d"];

function transformIconData(
  tree: IconTree,
  name: string,
  familyName: string
): string {
  let flat = true;
  const up = unexpectedError(name); // lol

  // family-specific fixes
  if (familyName === "md") {
    // remove useless paths
    tree.child = tree.child.filter((child) => child.attr.fill !== "none");
  }

  // validate and check if the icon can be "flat" (path d value) or not (tree)
  if (tree.tag !== "svg") throw up;
  const { viewBox } = tree.attr;
  if (!viewBox) throw up;
  const { minX, minY, width, height } = viewBox.match(VIEW_BOX_REGEXP)!.groups!;
  if (!width || !height) throw up;
  if (minX !== "0" || minY !== "0") throw up;
  if (Object.keys(tree.attr).some((key) => !FLAT_SVG_ATTRS.includes(key)))
    flat = false;
  if (typeof tree.attr.style === "string" && tree.attr.style !== "") throw up;
  if (tree.attr.fill && tree.attr.fill !== "currentColor") flat = false;
  if (!tree.child || tree.child.length > 1 || tree.child[0].tag !== "path")
    flat = false;
  if (
    !tree.child ||
    Object.keys(tree.child[0].attr).some(
      (key) => !FLAT_PATH_ATTRS.includes(key)
    )
  )
    flat = false;

  // return flat icon
  if (flat)
    return `"${tree.child[0].attr.d} M${ICON_SIZE_ESCAPE_SEQUENCE} ${width}.${height}"`;

  // clean up attributes
  const filteredAttr = tree.attr;
  delete filteredAttr.viewBox;
  delete filteredAttr.version;
  delete filteredAttr["aria-hidden"];
  delete filteredAttr.t; // ai family adds this non-standard attr
  if (filteredAttr.style === "") delete filteredAttr.style;

  // return tree icon
  return `{
    data: ${treeToReactFragment(tree)},
    size: { width: ${width}, height: ${height} },
    ${
      Object.keys(filteredAttr).length > 0
        ? `props: ${JSON.stringify(filteredAttr)}`
        : ""
    }}`;
}

function nodeToJsx(node: IconTree) {
  const props = Object.entries(node.attr)
    .map(([key, value]) =>
      typeof value === "string"
        ? `${key}="${value}"`
        : `${key}={${JSON.stringify(value)}}`
    )
    .join(" ");
  const selfClosing = node.tag !== "" && !node.child;
  return `<${node.tag} ${props} ${selfClosing ? "/" : ""}>${
    node.child ? node.child.map(nodeToJsx).join("") : ""
  }${selfClosing ? "" : `</${node.tag}>`}`;
}

function treeToReactFragment(tree: IconTree) {
  return nodeToJsx({ tag: "", attr: {}, child: tree.child });
}

async function getAllIconFamilies(packagePath: string) {
  const filesAndDirs = await fs.readdir(packagePath, {
    withFileTypes: true,
  });
  const dirs = filesAndDirs.filter(
    (f) => f.isDirectory() && !IGNORED_FAMILIES.includes(f.name)
  );
  return dirs.map(({ name }) => ({
    name,
    path: path.resolve(packagePath, name),
  }));
}

async function formatFile(filePath: string) {
  const file = await fs.readFile(filePath, { encoding: "utf-8" });
  const config = await prettier.resolveConfig(filePath);
  const formatted = prettier.format(file, { ...config, filepath: filePath });
  return fs.writeFile(filePath, formatted);
}

async function autofixFile(filePath: string) {
  const eslint = new ESLint({ fix: true });
  const results = await eslint.lintFiles([filePath]);
  await ESLint.outputFixes(results);
}

async function persistIcons(
  iconsByFamily: {
    name: string;
    icons: { name: string; data: string }[];
  }[]
) {
  for (const { name, icons } of iconsByFamily) {
    const filePath = path.resolve(DEST_PATH, `${name}.tsx`);
    let fileContent = "// AUTOGENERATED FILE - DO NOT EDIT\n\n";
    fileContent += "import { type IconData } from '@createinc/archetype';\n\n";
    icons.forEach(({ name: iconName, data }) => {
      fileContent += `export const ${iconName}: IconData = ${data};\n\n`;
    });
    await fs.writeFile(filePath, fileContent);
    await autofixFile(filePath);
    await formatFile(filePath);
  }
}

async function main() {
  const packagePath = temporaryDirectory();
  console.log(
    `Downloading and extracting the "react-icons" package to "${packagePath}"...`
  );
  const { resolved } = await pacote.extract("react-icons", packagePath);
  console.log(`✓ Extracted successfully - downloaded from "${resolved}"`);

  console.log("Obtaining icon families...");
  const iconFamilies = await getAllIconFamilies(packagePath);

  console.log("Extracting icon data...");
  const iconDataByFamily = await Promise.all(
    iconFamilies.map(async ({ name, path: familyPath }) => ({
      name,
      icons: await extractIconDataFromFile(
        path.resolve(familyPath, "index.esm.js")
      ),
    }))
  );

  console.log("Transforming icon data into the Archetype icon format...");
  const archetypeIconsByFamily = await Promise.all(
    iconDataByFamily.map(async ({ name: familyName, icons }) => ({
      name: familyName,
      icons: icons.map(({ name: iconName, data }) => ({
        name: iconName,
        data: transformIconData(data, iconName, familyName),
      })),
    }))
  );

  console.log(`Saving icon families into "${DEST_PATH}"...`);
  await persistIcons(archetypeIconsByFamily);
  console.log(`✓ All icon files saved successfully`);
}

main();
