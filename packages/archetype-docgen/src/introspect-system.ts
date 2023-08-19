/* eslint-disable @typescript-eslint/no-non-null-assertion */
import path from "node:path";

import { type JSDoc, Node, Project, type VariableStatement } from "ts-morph";

import {
  cleanTypeText,
  getJsDocData,
  type IntrospectedProps,
  introspectProps,
  isComponent,
  isHook,
} from "./introspection-utils";
import { noFalsy } from "./utils";

export type IntrospectSystemOptions = {
  tsConfigFilePath: string;
  designSystemIndexPath: string;
};

export type JSDocCommentType =
  | "undefined"
  | "link"
  | "linkCode"
  | "linkPlain"
  | "text"
  | "string";

export type JSDocTag = {
  name: string;
  hasNewLine: boolean;
  text: string | undefined;
  type: JSDocCommentType;
};

export type PropertyIntrospectionBase = {
  propertyName: string;
  fullName: string;
  description?: string;
  tags?: JSDocTag[] | undefined;
  node?: Node;
  jsDocNode?: JSDoc;
};

export type ComponentPropertyIntrospection = {
  kind: "component";
  options: IntrospectedProps | undefined;
} & PropertyIntrospectionBase;

export type HookPropertyIntrospection = {
  kind: "hook";
  signatures:
    | {
        parameters: { name: string; required: boolean; type: string }[];
        returnType: string;
      }[]
    | undefined;
} & PropertyIntrospectionBase;

export type OtherPropertyIntrospection = {
  kind: "other";
  type: string;
} & PropertyIntrospectionBase;

export type PropertyIntrospection =
  | ComponentPropertyIntrospection
  | HookPropertyIntrospection
  | OtherPropertyIntrospection;

export type ComponentIntrospection = {
  name: string;
  description?: string;
  tags?: JSDocTag[] | undefined;
  options: IntrospectedProps | undefined;
  properties: PropertyIntrospection[] | undefined;
  filePath: string;
  node?: VariableStatement;
  jsDocNode?: JSDoc;
};

export type SystemIntrospection = ComponentIntrospection[];

export function introspectSystem(
  options: IntrospectSystemOptions
): SystemIntrospection {
  const { tsConfigFilePath, designSystemIndexPath } = options;
  const project = new Project({ tsConfigFilePath });

  const indexFile = project.getSourceFileOrThrow(designSystemIndexPath);

  const typeChecker = project.getTypeChecker();

  const exportedSymbols = typeChecker.getExportsOfModule(
    indexFile.getSymbolOrThrow()
  );

  // option types
  // ------------

  const optionTypes: Record<string, IntrospectedProps> = {};
  exportedSymbols.forEach((symbol) => {
    const match = symbol
      .getName()
      .match(/^(?<componentName>[A-Z][a-zA-Z0-9]+)Options$/);

    // name doesn't match `ComponentNameOptions` format
    if (!match) return;

    const componentName = match.groups!.componentName!;

    const node = symbol.getDeclarations()[0];

    // missing node
    if (!node) return;

    const optionsType = node.getType();
    const propsData = introspectProps(optionsType, node);

    if (!Node.isJSDocable(node)) return false;

    optionTypes[componentName] = propsData;
  });

  // components
  // ----------

  const components = exportedSymbols
    .map((symbol) => {
      const name = symbol.getName();
      // name doesn't match `ComponentName` format
      if (!/^[A-Z][a-zA-Z0-9]+$/.test(name)) return false;
      // doesn't have a value declaration
      if (!symbol.getValueDeclaration()) return false;

      const variableDeclarationNode = symbol.getDeclarations()[0];
      // not a variable declaration
      if (!Node.isVariableDeclaration(variableDeclarationNode)) return false;
      const node = variableDeclarationNode.getVariableStatementOrThrow();

      const absoluteFilePath = node.getSourceFile().getFilePath();
      const filePath = path.relative(
        path.dirname(tsConfigFilePath),
        absoluteFilePath
      );

      const type = symbol.getTypeAtLocation(variableDeclarationNode);
      const callSignatures = type.getCallSignatures();

      // too little or too many call signatures
      if (callSignatures.length !== 1) return false;
      const callSignature = callSignatures[0];

      // missing call signature
      if (!callSignature) return false;

      const { description, tags, jsDocNode } = getJsDocData(node);

      const options = optionTypes[name];

      // properties
      // ----------

      const introspectedProperties = type
        .getProperties()
        .filter((property) => property.getName() !== "displayName")
        .map((property): PropertyIntrospection => {
          const kind = isComponent(property)
            ? "component"
            : isHook(property)
            ? "hook"
            : "other";
          const propertyName = property.getName();
          const fullName = `${name}.${property.getName()}`;

          const node = property.getDeclarations()[0];
          if (!node) throw new Error("Expected node to be present");

          const { description, tags, jsDocNode } = getJsDocData(node);

          const shared = {
            propertyName,
            fullName,
            description,
            tags,
            node,
            jsDocNode,
          };

          // component

          if (kind === "component") {
            const optionsTypeName = `${name}${propertyName}`;
            const options = optionTypes[optionsTypeName];
            return { kind: "component", options, ...shared };
          }

          // hook

          if (kind === "hook") {
            const hookType = property.getTypeAtLocation(node);
            const callSignatures = hookType.getCallSignatures();

            if (callSignatures.length === 0)
              throw new Error("Expected at least one call signature");

            const signatures = callSignatures.map((signature) => {
              const parameters = signature.getParameters().map((parameter) => {
                const parameterNode = parameter.getDeclarations()[0];
                if (!Node.isParameterDeclaration(parameterNode))
                  throw new Error(
                    "Expected parameter node to be a parameter declaration"
                  );
                return {
                  name: parameter.getName(),
                  required: !parameterNode.isOptional(),
                  type: cleanTypeText(
                    parameter.getTypeAtLocation(parameterNode).getText()
                  ),
                };
              });

              const returnType = cleanTypeText(
                signature.getReturnType().getText()
              );

              return { parameters, returnType };
            });

            return { kind: "hook", signatures, ...shared };
          }

          // other

          return {
            kind: "other",
            type: cleanTypeText(property.getTypeAtLocation(node).getText()),
            ...shared,
          };
        });

      const properties =
        introspectedProperties.length > 0 ? introspectedProperties : undefined;

      return {
        name,
        description,
        tags,
        options,
        properties,
        filePath,
        node,
        jsDocNode,
      };
    })
    .filter(noFalsy);

  return components;
}
