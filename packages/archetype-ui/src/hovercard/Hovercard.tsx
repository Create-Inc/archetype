import "./Hovercard.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type ExtendedProps,
  renderAsChild,
  scopedStyles,
} from "@createinc/archetype";
import clsx from "clsx";

const styles = scopedStyles("Hovercard");

// hovercard
// ---------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useHovercardStore,
  "Hovercard"
);

/**
 * A card popover that is displayed when the anchor element is hovered.
 *
 * @example
 *
 * ```tsx
 * <Hovercard>
 *   <Hovercard.Anchor>
 *     <a href="...">@daniguardio_la</a>
 *   </Hovercard.Anchor>
 *   <Hovercard.Popover>Content</Hovercard.Popover>
 * </Hovercard>;
 * ```
 */
export const Hovercard: Component<HovercardProps, Properties> = createComponent(
  ({ ...props }) => <Root {...DEFAULT_STORE_PROPS} {...props} />
);

/** `Hovercard` options. */
export type HovercardOptions = {
  /** The Ariakit store. */
  store?: Ariakit.HovercardStore;

  /** The children. */
  children?: React.ReactNode;
};

/** `Hovercard` props. */
export type HovercardProps = ExtendedProps<
  Ariakit.HovercardStoreProps,
  HovercardOptions
>;

// store
// -----

const DEFAULT_STORE_PROPS = {
  animated: true,
  placement: "bottom",
} as const; // satisfies Ariakit.HovercardStoreProps

function useStore(props?: Ariakit.HovercardStoreProps) {
  return Ariakit.useHovercardStore({ ...DEFAULT_STORE_PROPS, ...props });
}

Hovercard.useStore = useStore;
Hovercard.useStoreContext = useStoreContext;
interface Properties {
  /**
   * `Hovercard` Ariakit store hook. Extends
   * [`Ariakit.useHovercardStore`](https://ariakit.org/reference/use-hovercard-store).
   *
   * @example
   *
   * ```tsx
   * const hovercardStore = Hovercard.useStore();
   * ```
   */
  useStore: typeof useStore;

  /**
   * `Hovercard` Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const hovercardStore = Hovercard.useStoreContext();
   * ```
   */
  useStoreContext: typeof useStoreContext;
}

// anchor
// ------

const Anchor: Component<HovercardAnchorProps> = createComponent(
  ({ children, ...props }) => (
    <Ariakit.HovercardAnchor
      render={renderAsChild(children, { componentName: "Hovercard.Anchor" })}
      store={useStoreContext()}
      {...props}
    />
  )
);

/** `Hovercard.Anchor` props. */
export type HovercardAnchorProps = ExtendedProps<Ariakit.HovercardAnchorProps>;

Hovercard.Anchor = Anchor;
interface Properties {
  /**
   * The anchor of the hover card. Extends [`<Ariakit.HovercardAnchor
   * />`](https://ariakit.org/reference/hovercard-anchor). Rendered as the
   * passed child.
   *
   * @example
   *
   * ```tsx
   * <Hovercard>
   *   <Hovercard.Anchor>
   *     <Button>Hover me!</Button>
   *   </Hovercard.Anchor>
   *   ...
   * </Hovercard>;
   * ```
   */
  Anchor: typeof Anchor;
}

// popover
// -------

const DEFAULT_POPOVER_PROPS = {
  gutter: 4,
} as const; // satisfies Partial<HovercardPopoverProps>

const Popover: Component<HovercardPopoverProps> = createComponent(
  ({ gutter = DEFAULT_POPOVER_PROPS.gutter, ...props }) => {
    const store = props.store ?? useStoreContext();
    const mounted = store.useState("mounted");
    const placement = store.useState("placement");
    const side = placement.split("-")[0];
    return mounted ? (
      <Ariakit.Hovercard
        portal
        store={useStoreContext()}
        data-side={side}
        gutter={gutter}
        {...props}
        className={clsx(styles.popover, props.className)}
      />
    ) : null;
  }
);

/** `Hovercard.Popover` props. */
export type HovercardPopoverProps = ExtendedProps<Ariakit.HovercardProps>;

Hovercard.Popover = Popover;
interface Properties {
  /**
   * The card popover. Extends [`<Ariakit.Hovercard
   * />`](https://ariakit.org/reference/hovercard). Rendered as `<div />`.
   *
   * @example
   *
   * ```tsx
   * <Hovercard>
   *   ...
   *   <Hovercard.Popover>Content</Hovercard.Popover>;
   * </Hovercard>;
   * ```
   */
  Popover: typeof Popover;
}
