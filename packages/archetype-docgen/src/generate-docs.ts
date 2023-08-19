import {
  type ComponentIntrospection,
  type ComponentPropertyIntrospection,
  type HookPropertyIntrospection,
  type SystemIntrospection,
} from "./introspect-system";
import {
  type IntrospectedProps,
  type JSDocTagData,
} from "./introspection-utils";
import { noFalsy } from "./utils";

function formatMarkdown(content: string) {
  return content; // TODO: format with prettier
}

function generateMarkdownPropsDocs(props: IntrospectedProps) {
  let out = "";

  Object.entries(props).forEach(
    ([name, { required, type, description, tags }]) => {
      out += `**\`${name}\`**`;
      out += required ? " (required)" : "";
      out += ` - \`${type}\`\n\n`;
      out += `${description}\n\n`;

      if (tags) out += generateMarkdownTagsDocs(tags, `${name} (prop)`, 2);
    }
  );

  return out;
}

function generateMarkdownTagsDocs(
  tags: JSDocTagData[],
  name: string,
  level: number
) {
  let out = "";

  const examples = tags
    ?.filter(({ name }) => name === "example")
    .map(({ text }) => text)
    .filter(noFalsy);

  if (examples?.length) {
    const missingCodeBlockSyntax = !examples.every(
      (example) => example.startsWith("```") && example.endsWith("```")
    );
    if (missingCodeBlockSyntax)
      console.warn(
        `Examples in "${name}" are missing code block syntax (\`\`\`)`
      );

    const missingLanguageIndicator = !examples.every(
      (example) => example.charAt(3) && /[a-z]/.test(example.charAt(3))
    );
    if (missingLanguageIndicator)
      console.warn(
        `Examples in "${name}" are missing language code block indicators (\`\`\`tsx)`
      );

    out += `${"#".repeat(level)} Examples\n\n`;
    out += examples.join("\n\n");
    out += "\n\n";

    return out;
  }
}

function generateMarkdownComponentDocs(
  component: ComponentIntrospection,
  _skipFormat?: boolean
) {
  let out = "";

  out += `# ${component.name}\n\n`;
  out += `${component.description}\n\n`;

  if (component.tags)
    out += generateMarkdownTagsDocs(component.tags, component.name, 2);

  if (component.options) {
    out += "## Options\n\n";

    out += generateMarkdownPropsDocs(component.options);
    out += "\n\n";
  }

  const subcomponents = component.properties?.filter(
    (p): p is ComponentPropertyIntrospection => p.kind === "component"
  );

  if (subcomponents) {
    out += "## Subcomponents\n\n";

    subcomponents.forEach(({ fullName, options, description, tags }) => {
      out += `### ${fullName}\n\n`;
      out += `${description}\n\n`;

      if (tags) out += generateMarkdownTagsDocs(tags, fullName, 4);

      if (options) {
        out += "#### Options\n\n";

        out += generateMarkdownPropsDocs(options);
        out += "\n\n";
      }
    });
  }

  const hooks = component.properties?.filter(
    (p): p is HookPropertyIntrospection => p.kind === "hook"
  );

  if (hooks) {
    out += "## Hooks\n\n";

    hooks.forEach(({ fullName, description, tags }) => {
      out += `### ${fullName}\n\n`;
      out += `${description}\n\n`;

      if (tags) out += generateMarkdownTagsDocs(tags, fullName, 4);

      // TODO: signatures
    });
  }

  return _skipFormat ? out : formatMarkdown(out);
}

export function generateComponentDocs(
  component: ComponentIntrospection,
  format: "markdown" | "html"
) {
  if (format === "markdown") return generateMarkdownComponentDocs(component);
  throw new Error(`Unsupported format: ${format}`);
}

export function generateSystemDocs(
  system: SystemIntrospection,
  format: "markdown" | "html"
) {
  if (format === "markdown") {
    let out = "";

    out += system
      .map((component) => generateMarkdownComponentDocs(component, true))
      .join("\n\n");

    return formatMarkdown(out);
  }
  throw new Error(`Unsupported format: ${format}`);
}
