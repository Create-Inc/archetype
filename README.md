# Archetype

The design system **system**.

## Introduction

Building a design system is hard. Among other things, you have to take care of...

- Boilerplate and tooling.
- Design tokens.
- Component authoring.
- Component documentation.
- Accessibility.
- Styling and theming.
- Integration with your projects.

Archetype is an **opinionated design system stack**. It's here to help you build [React](https://react.dev/) and [TypeScript](https://typescriptlang.org/) design systems, and tackle these challenges efficiently and without pain.

The stack leverages the following technologies:

- The web platform ([HTML](https://developer.mozilla.org/docs/Web/HTML) and [CSS](https://developer.mozilla.org/docs/Web/CSS))
- [Ariakit](https://ariakit.org/) (accessible UI primitives)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS framework)

The principles behind Archetype are:

- Use the platform. Extend the platform.
- Simplicity and consistency.
- Composition over configuration.

## What you get

By using Archetype, you'll build a **design system package** that you can use in any React project. This package will provide design tokens, high-quality components, and documentation.

Integrating your package into a project is simple, provided the following:

- You have a monorepo setup or some other way of using the package (e.g. publishing on npm).
- You use Tailwind CSS v3+<sup>1</sup> for styling. <sup>2</sup>
- Your bundler configuration allows CSS imports in a package. <sup>3</sup>
- You use TypeScript v5+. <sup>4</sup>

<details>
  <summary>Notes</summary>

1. Older versions might still work, but you might get have to deal with some type errors and it is not officially supported.

2. Tailwind CSS is not a requirement for components because styles are exported as standard CSS stylesheets, but it is the recommended way to use design tokens.

3. This is the case for [Next.js](https://nextjs.org/) v13.1+, [Vite](https://vitejs.dev/), [Parcel](https://parceljs.org/), and many other frameworks and bundlers. For older Next.js versions, you can use [next-transpile-modules](https://www.npmjs.com/package/next-transpile-modules). Other bundlers may require additional configuration.

4. The only feature that requires TypeScript v5+ is the `satisfies` type operator. If you're on an older version, you can use `as const` instead, but you'll lose some type-safety.

</details>

If your project meets these requirements, you're good to go!

If not, you can still use the parts of Archetype that are useful to you, or create your own variation of the stack.

## What Archetype gives you

Archetype is both a set of guidelines and a set of tools.

These tools complement the guidelines, and are structured as follows:

### `@createinc/archetype`

The core of Archetype. Utilities and types for:

- **The "system":** `createComponent`, `createPolymorphicComponent`, `ExtendedProps...
- **Design tokens:** `createArchetypeTokens`, `withArchetypeTailwind`...
- **Specific components:** `useAvatar`, `useIcon`...

It also provides two PostCSS plugins (**"Better states"** and **"Scope"**) that are used to author component styles with ease.

[Learn more.](./packages/archetype/README.md)

### `@createinc/archetype-icons`

Icons from many popular icon families. Icons are exported using the Archetype icon format, which is optimized for size and composition.

This package sources its icons from the latest version of [React Icons](https://react-icons.github.io/react-icons), so all of its families are included.

> Full credit goes to `React Icons` for the excellent compilation of icons and icon families, and to the original authors of the icons for their work.

[Learn more.](./packages/archetype-icons/README.md)

### `@createinc/archetype-ui`

A full-featured template for your design system.

You can copy this package as a starting point and adapt it to your needs. It contains a robust set of initial design tokens, and an extensive variety of components.

Most of the tokens and components have been directly adapted from [`shadcn/ui`](https://ui.shadcn.com/). Archetype UI is fully compatible with its themes because of this.

> Full credit goes to `shadcn/ui` for the excellent theming system and the beautiful component styles.

[Learn more.](./packages/archetype-ui/README.md)

### `@createinc/archetype-docgen`

A documentation generator for your design system.

It provides two set of utilities:

- **Introspection utilities:** obtain information about your design system with a deep level of detail. These utilities give you strongly typed structured information that you can use to build your documentation.
- **Generation utilities:** generate documentation from the information obtained with the introspection utilities. The supported formats are Markdown and HTML<b>\*</b> (converted from Markdown).

The kind of information you can obtain includes:

- **Components:** names, descriptions, props, examples...
- **Design tokens.\***
- **Utilities.\***
- **Icons.\***

_<b>\*</b> These features have not been implemented yet._

[Learn more.](./packages/archetype-docgen/README.md)

## Getting started

There are two ways to get started with Archetype:

- **Use the template (recommended):** copy the [Archetype UI](./packages/archetype-ui/README.md) package, rename it, and adapt it to your needs.
- **Build your own:** use the [Archetype](./packages/archetype/README.md) package to build your own design system package from scratch.

To learn more about Archetype, it is recommended to check out the READMEs of the packages listed above ("Learn more" links). Reading the `archetype-ui` source code is also a good way to learn about the stack.

In the future, we might provide better documentation and learning resources, as well as simpler ways to get started (like a CLI).

In the meantime, feel free to start discussions or issues on GitHub, or reach out to us on Twitter if you have any questions or feedback.

- [@create_xyz](https://twitter.com/create_xyz)
- [@daniguardio_la](https://twitter.com/daniguardio_la) (maintainer)

## License

Distributed under the MIT License. See `LICENSE` for more information.
