import "./Tooltip.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createComponent,
  type ExtendedProps,
  renderAsChild,
  scopedStyles,
  useAriakitStore,
} from "@createinc/archetype";
import clsx from "clsx";
import { type ReactNode } from "react";

const styles = scopedStyles("Tooltip");

// tooltip
// -------

/**
 * A tooltip. Extends [`<Ariakit.TooltipAnchor
 * />`](https://ariakit.org/reference/tooltip-anchor). Rendered as the passed
 * child, which will become the anchor.
 *
 * It renders [`<Ariakit.Tooltip />`](https://ariakit.org/reference/tooltip)
 * internally.
 *
 * @example
 *
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <Button>Button</Button>
 * </Tooltip>;
 * ```
 */
export const Tooltip: Component<TooltipProps, Properties> = createComponent(
  ({ children, content, tooltipProps, store, storeProps, ...props }) => {
    const tooltipStore = useAriakitStore(Ariakit.useTooltipStore, store, {
      ...DEFAULT_STORE_PROPS,
      ...storeProps,
    });
    const mounted = tooltipStore.useState("mounted");
    return (
      <>
        <Ariakit.TooltipAnchor
          render={renderAsChild(children)}
          store={tooltipStore}
          {...props}
        />
        {mounted ? (
          <Ariakit.Tooltip
            store={tooltipStore}
            {...tooltipProps}
            className={clsx(styles.tooltip, tooltipProps?.className)}
          >
            {content}
          </Ariakit.Tooltip>
        ) : null}
      </>
    );
  }
);

/** `Tooltip` options. */
export type TooltipOptions = {
  /** The tooltip props. */
  tooltipProps?: Partial<Ariakit.TooltipProps>;

  /** The tooltip store props. */
  storeProps?: Ariakit.TooltipStoreProps;

  /** The tooltip's content. */
  content?: ReactNode;
};

/** `Tooltip` props. */
export type TooltipProps = ExtendedProps<
  Ariakit.TooltipAnchorProps,
  TooltipOptions
>;

// store
// -----

const DEFAULT_STORE_PROPS = {
  animated: true,
} as const; // satisfies Ariakit.TooltipStoreProps

function useStore(props?: Ariakit.TooltipStoreProps) {
  return Ariakit.useTooltipStore({ ...DEFAULT_STORE_PROPS, ...props });
}

Tooltip.useStore = useStore;
interface Properties {
  /**
   * `Tooltip` Ariakit store hook. Extends
   * [`Ariakit.useTooltipStore`](https://ariakit.org/reference/use-tooltip-store).
   *
   * @example
   *
   * ```tsx
   * const tooltipStore = Tooltip.useStore();
   * ```
   */
  useStore: typeof useStore;
}
