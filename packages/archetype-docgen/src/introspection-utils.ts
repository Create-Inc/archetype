import {
  type JSDoc,
  Node,
  type Symbol as TSMorphSymbol,
  type ts,
  type Type,
} from "ts-morph";

export function cleanTypeText(text: string) {
  return text?.replace(/import\("\S*?"\)\./g, "").trim(); // remove import calls
}

export function getNormalizedTypeText(symbol: TSMorphSymbol, node: Node) {
  const type = symbol.getTypeAtLocation(node);
  let text = type.getText();
  // remove undefined from union type if property is optional
  // TODO: there might be a better way to do this than string manipulation
  if (symbol.isOptional() && type.isUnion())
    text = text.replace("| undefined", "");
  return cleanTypeText(text);
}

export type JSDocCommentType =
  | "undefined"
  | "link"
  | "linkCode"
  | "linkPlain"
  | "text"
  | "string";

export type JSDocTagData = {
  name: string;
  hasNewLine: boolean;
  text: string | undefined;
  type: JSDocCommentType;
};

export type JSDocData = {
  description?: string;
  tags?: JSDocTagData[];
  jsDocNode?: JSDoc;
};

export function getJsDocData(node: Node): JSDocData {
  // not JSDocable
  if (!Node.isJSDocable(node)) throw new Error("Expected node to be JSDocable");

  const jsDocNode = node.getJsDocs()[0];

  // missing JSDoc node
  if (!jsDocNode) return {};

  const description = jsDocNode.getDescription().trim();

  const tagNodes = jsDocNode.getTags();
  const tags = tagNodes?.map((tag) => {
    const name = tag.getTagName();

    // there might be a cleaner way to do this
    const fullText = tag.getFullText().trimStart();
    const tagNameLength = tag.getTagName().length + 1;
    const hasNewLine = fullText[tagNameLength] === "\n";

    const comment = tag.getComment();

    let type: JSDocCommentType = "undefined";
    if (Node.isJSDocLink(tag)) type = "link";
    if (Node.isJSDocLinkCode(tag)) type = "linkCode";
    if (Node.isJSDocLinkPlain(tag)) type = "linkPlain";
    if (Node.isJSDocText(tag)) type = "text";
    if (typeof comment === "string") type = "string";

    const text = tag.getCommentText()?.trim();

    return { name, hasNewLine, text, type };
  });

  return { description, tags, jsDocNode };
}

export type IntrospectedProps = Record<
  string,
  { type: string; required: boolean } & JSDocData
>;

export function introspectProps(
  propsType: Type<ts.Type>,
  node: Node
): IntrospectedProps {
  const props: IntrospectedProps = {};

  propsType.getProperties().forEach((propertySymbol) => {
    const type = getNormalizedTypeText(propertySymbol, node);
    if (!type) throw new Error("Expected type to be present");

    const propertyNode = propertySymbol.getDeclarations()[0];

    if (!propertyNode) throw new Error("Expected node to be present");
    if (!Node.isPropertySignature(propertyNode))
      throw new Error("Expected node to be a property signature");

    props[propertySymbol.getName()] = {
      type,
      required: !propertySymbol.isOptional(),
      ...getJsDocData(propertyNode),
    };
  });

  return props;
}

export function isComponent(symbol: TSMorphSymbol) {
  const name = symbol.getName();

  // name doesn't match `ComponentName` format
  if (!/^[A-Z][a-zA-Z0-9]+$/.test(name)) return false;

  // doesn't have a value declaration
  if (!symbol.getValueDeclaration()) return false;

  const node = symbol.getDeclarations()[0];

  // missing node
  if (!node) return false;

  const type = symbol.getTypeAtLocation(node);
  const callSignatures = type.getCallSignatures();

  // too little or too many call signatures
  if (callSignatures.length !== 1) return false;

  const callSignature = callSignatures[0];

  // missing call signature
  if (!callSignature) return false;

  return true;
}

export function isHook(symbol: TSMorphSymbol) {
  const name = symbol.getName();

  // name doesn't match `useHook` format
  if (!/^use[A-Z][a-zA-Z0-9]+$/.test(name)) return false;

  // doesn't have a value declaration
  if (!symbol.getValueDeclaration()) return false;

  const node = symbol.getDeclarations()[0];

  // missing node
  if (!node) return false;

  const type = symbol.getTypeAtLocation(node);
  const callSignatures = type.getCallSignatures();

  // has no call signatures
  if (callSignatures.length < 1) return false;

  const callSignature = callSignatures[0];

  // missing call signature
  if (!callSignature) return false;

  return true;
}
