import "./Card.scoped.css";

import {
  type Component,
  createComponent,
  type ExtendedProps,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Card");

// card
// ----

/**
 * A card. Rendered as `<section />`.
 *
 * @example
 *
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Title</Card.Title>
 *     <Card.Description>Description.</Card.Description>
 *   </Card.Header>
 *   <Card.Content>Content</Card.Content>
 *   <Card.Footer>Footer</Card.Footer>
 * </Card>;
 * ```
 */
export const Card: Component<CardProps, Properties> = createComponent(
  (props) => (
    <section {...props} className={clsx(styles.card, props.className)} />
  )
);

/** `Card` props. */
export type CardProps = ExtendedProps<"section">;

// header
// ------

const Header: Component<CardHeaderProps> = createComponent((props) => (
  <header {...props} className={clsx(styles.header, props.className)} />
));

/** `Card.Header` props. */
export type CardHeaderProps = ExtendedProps<"header">;

Card.Header = Header;
interface Properties {
  /**
   * The card's header. Rendered as `<header />`.
   *
   * @example
   *
   * ```tsx
   * <Card.Header>
   *   <Card.Title>Title</Card.Title>
   *   <Card.Description>Description.</Card.Description>
   * </Card.Header>;
   * ```
   */
  Header: typeof Header;
}

// title
// -----

const Title: Component<CardTitleProps> = createComponent((props) => (
  <h1 {...props} className={clsx(styles.title, props.className)} />
));

/** `Card.Title` props. */
export type CardTitleProps = ExtendedProps<"h1">;

Card.Title = Title;
interface Properties {
  /**
   * The card's title. Rendered as `<h1 />`.
   *
   * @example
   *
   * ```tsx
   * <Card.Title>Title</Card.Title>;
   * ```
   */
  Title: typeof Title;
}

// description
// -----------

const Description: Component<CardDescriptionProps> = createComponent(
  (props) => (
    <p {...props} className={clsx(styles.description, props.className)} />
  )
);

/** `Card.Description` props. */
export type CardDescriptionProps = ExtendedProps<"p">;

Card.Description = Description;
interface Properties {
  /**
   * The card's description. Rendered as `<p />`.
   *
   * @example
   *
   * ```tsx
   * <Card.Description>Description.</Card.Description>;
   * ```
   */
  Description: typeof Description;
}

// content
// -------

const Content: Component<CardContentProps> = createComponent((props) => (
  <div {...props} className={clsx(styles.content, props.className)} />
));

/** `Card.Content` props. */
export type CardContentProps = ExtendedProps<"div">;

Card.Content = Content;
interface Properties {
  /**
   * The card's content. Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Card.Content>Content</Card.Content>;
   * ```
   */
  Content: typeof Content;
}

// footer
// ------

const Footer: Component<CardFooterProps> = createComponent((props) => (
  <footer {...props} className={clsx(styles.footer, props.className)} />
));

/** `Card.Footer` props. */
export type CardFooterProps = ExtendedProps<"footer">;

Card.Footer = Footer;
interface Properties {
  /**
   * The card's footer. Rendered as `<footer />`.
   *
   * @example
   *
   * ```tsx
   * <Card.Footer>Footer</Card.Footer>;
   * ```
   */
  Footer: typeof Footer;
}
