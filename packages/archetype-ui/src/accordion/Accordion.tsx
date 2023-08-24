import "./Accordion.scoped.css";

import * as Ariakit from "@ariakit/react";
import {
  type Component,
  createAriakitRoot,
  createComponent,
  type DataAttributes,
  type ExtendedProps,
  mergeProps,
  scopedStyles,
  useMergeRefs,
} from "@createinc/archetype";
import clsx from "clsx";
import {
  type ComponentPropsWithRef,
  type CSSProperties,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { Icon } from "../icon";
import { luChevronDown } from "../icons";
import {
  type AccordionContextValue,
  AccordionProvider,
  type AccordionValue as _AccordionValue,
  useAccordionContext,
} from "./context";

const styles = scopedStyles("Accordion");

// accordion
// ---------

const { Root, useStoreContext } = createAriakitRoot(
  Ariakit.useCompositeStore,
  "Accordion (Composite)"
);

// split into a different component in order to use the store context
const InternalComposite: Component<ExtendedProps<Ariakit.CompositeProps>> =
  createComponent((props) => (
    <Ariakit.Composite store={useStoreContext()} {...props} />
  ));

/**
 * An accordion.
 *
 * By default, it only allows one item to be open at a time. To allow multiple
 * items to be open, set `value` or `defaultValue` to an array of ids.
 *
 * @example
 *
 * ```tsx
 * <Accordion>
 *   <Accordion.Item>
 *     <Accordion.Trigger value="first">First item</Accordion.Trigger>
 *     <Accordion.Content>First item content</Accordion.Content>
 *   </Accordion.Item>
 *   <Accordion.Item>
 *     <Accordion.Trigger value="second">Second item</Accordion.Trigger>
 *     <Accordion.Content>Second item content</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // allow multiple open
 * <Accordion defaultValue={[]}>...</Accordion>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // uncontrolled
 * <Accordion defaultValue="item-1">...</Accordion>;
 * ```
 *
 * @example
 *
 * ```tsx
 * // controlled
 * const [value, setValue] = useState<AccordionValue>("item-2");
 * <Accordion value={value} setValue={setValue}>
 *   ...
 * </Accordion>;
 * ```
 */
export const Accordion: Component<AccordionProps, Components> = createComponent(
  ({
    animated,
    value,
    setValue,
    defaultValue,
    store,
    storeProps,
    ...props
  }) => {
    const [internalValue, internalSetValue] = useState(defaultValue);
    return (
      <AccordionProvider
        value={{
          animated,
          value: value ?? internalValue,
          setValue: setValue ?? internalSetValue,
        }}
      >
        <Root store={store} {...storeProps}>
          <InternalComposite {...props} />
        </Root>
      </AccordionProvider>
    );
  }
);

/** `Accordion` options. */
export type AccordionOptions = AccordionContextValue & {
  /**
   * The default value, which consists of the id of the open item, or an array
   * of ids if multiple selection is allowed.
   */
  defaultValue?: _AccordionValue;

  /** The Ariakit store. */
  store?: Ariakit.MenuBarStore;

  /** The Ariakit store props. */
  storeProps?: Omit<Ariakit.MenuBarStoreProps, "store">;
};

/** `Accordion` props. */
export type AccordionProps = ExtendedProps<
  Ariakit.CompositeProps,
  AccordionOptions
>;

/** `Accordion` value. */
export type AccordionValue = _AccordionValue;

// store
// -----

Accordion.useStore = Ariakit.useCompositeStore;
Accordion.useStoreContext = useStoreContext;
interface Components {
  /**
   * `Accordion` (`Composite`) Ariakit store hook. Extends
   * [`Ariakit.useCompositeStore`](https://ariakit.org/reference/use-composite-store).
   *
   * @example
   *
   * ```tsx
   * const accordionStore = Accordion.useStore();
   * ```
   */
  useStore: typeof Ariakit.useCompositeStore;

  /**
   * `Accordion` (`Composite`) Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const accordionStore = Accordion.useStoreContext();
   * ```
   */
  useStoreContext: typeof useStoreContext;
}

// item
// ----

const { Root: ItemRoot, useStoreContext: useItemStoreContext } =
  createAriakitRoot(Ariakit.useDisclosureStore, "Accordion.Item (Disclosure)");

const Item: Component<AccordionItemProps> = createComponent(
  ({ store, storeProps, ...props }) => (
    <ItemRoot {...useDefaultItemStoreProps()} store={store} {...storeProps}>
      <div {...props} className={clsx(styles.item, props.className)} />
    </ItemRoot>
  )
);

/** `Accordion.Item` options. */
export type AccordionItemOptions = {
  /** The Ariakit store. */
  store?: Ariakit.DisclosureStore;

  /** The Ariakit store props. */
  storeProps?: Omit<Ariakit.DisclosureStoreProps, "store">;
};

/** `Accordion.Item` props. */
export type AccordionItemProps = ExtendedProps<"div", AccordionItemOptions>;

Accordion.Item = Item;
interface Components {
  /**
   * An accordion item.
   *
   * @example
   *
   * ```tsx
   * <Accordion>
   *   <Accordion.Item>
   *     <Accordion.Trigger>Trigger</Accordion.Trigger>
   *     <Accordion.Content>Content</Accordion.Content>
   *   </Accordion.Item>
   * </Accordion>;
   * ```
   */
  Item: typeof Item;
}

// item store
// ----------

function useDefaultItemStoreProps() {
  const { animated = true } = useAccordionContext();
  return { animated } satisfies Ariakit.DisclosureStoreProps;
}

function useItemStore(props?: Ariakit.DisclosureStoreProps) {
  return Ariakit.useSelectStore({ ...useDefaultItemStoreProps(), ...props });
}

Accordion.useItemStore = useItemStore;
Accordion.useItemStoreContext = useItemStoreContext;
interface Components {
  /**
   * `Accordion.Item` (`Disclosure`) Ariakit store hook. Extends
   * [`Ariakit.useDisclosureStore`](https://ariakit.org/reference/use-disclosure-store).
   *
   * @example
   *
   * ```tsx
   * const accordionItemStore = Accordion.useItemStore();
   * ```
   */
  useItemStore: typeof useItemStore;

  /**
   * `Accordion.Item` (`Disclosure`) Ariakit store context consumer.
   *
   * @example
   *
   * ```tsx
   * const accordionItemStore = Accordion.useItemStoreContext();
   * ```
   */
  useItemStoreContext: typeof useItemStoreContext;
}

// trigger
// -------

const Trigger: Component<AccordionTriggerProps> = createComponent(
  ({ value, compositeItemProps, children, ...props }) => {
    const { value: currentValue, setValue } = useAccordionContext();

    const open = Array.isArray(currentValue)
      ? currentValue.includes(value)
      : value === currentValue;

    const store = props.store ?? useItemStoreContext();
    const currentlyOpen = store.useState("open");

    useEffect(() => {
      if (open !== currentlyOpen) store.setOpen(open);
    }, [currentlyOpen, open, store]);

    function onClick(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      if (currentlyOpen) {
        if (Array.isArray(currentValue))
          setValue(currentValue.filter((v) => v !== value));
        else setValue(undefined);
      }
      if (!currentlyOpen) {
        if (Array.isArray(currentValue)) setValue([...currentValue, value]);
        else setValue(value);
      }
    }

    return (
      <Ariakit.Disclosure
        store={useItemStoreContext()}
        render={
          <Ariakit.CompositeItem
            store={useStoreContext()}
            {...compositeItemProps}
          >
            <span>{children}</span>
            <Icon className={styles.icon} icon={luChevronDown} />
          </Ariakit.CompositeItem>
        }
        {...mergeProps({ className: styles.trigger, onClick }, props)}
      />
    );
  }
);

/** `Accordion.Trigger` options. */
export type AccordionTriggerOptions = {
  /** The id of the trigger. */
  value: string;

  /**
   * Props passed to the internal [`<Ariakit.CompositeItem
   * />`](https://ariakit.org/reference/composite-item).
   */
  compositeItemProps?: ExtendedProps<Ariakit.CompositeItemProps>;
};

/** `Accordion.Trigger` props. */
export type AccordionTriggerProps = ExtendedProps<
  Ariakit.DisclosureProps,
  AccordionTriggerOptions
>;

Accordion.Trigger = Trigger;
interface Components {
  /**
   * The trigger of the accordion item. Extends [`<Ariakit.Disclosure
   * />`](https://ariakit.org/reference/disclosure) (combined with
   * [`<Ariakit.CompositeItem
   * />`](https://ariakit.org/reference/composite-item)). Rendered as `<button
   * />`.
   *
   * @example
   *
   * ```tsx
   * <Accordion.Item>
   *   <Accordion.Trigger>Trigger</Accordion.Trigger>
   *   ...
   * </Accordion.Item>;
   * ```
   */
  Trigger: typeof Trigger;
}

// content
// -------

const Content: Component<AccordionContentProps> = createComponent(
  ({ children, innerProps, ...props }) => {
    const store = props.store ?? useItemStoreContext();
    const open = store.useState("open");
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
      setHeight(ref.current?.scrollHeight ?? 0);
    }, [open]);

    return (
      <Ariakit.DisclosureContent
        store={useItemStoreContext()}
        {...props}
        ref={useMergeRefs(ref, props.ref)}
        className={clsx(styles.content, props.className)}
        style={
          {
            "--accordion-item-max-height": `${height}px`,
            ...props.style,
          } as CSSProperties
        }
      >
        <div
          {...mergeProps({ className: styles.inner, children }, innerProps)}
        />
      </Ariakit.DisclosureContent>
    );
  }
);

/** `Accordion.Content` options. */
export type AccordionContentOptions = {
  /** Props passed to the inner `<div />`. */
  innerProps?: ComponentPropsWithRef<"div"> & DataAttributes;
};

/** `Accordion.Content` props. */
export type AccordionContentProps = ExtendedProps<
  Ariakit.DisclosureContentProps,
  AccordionContentOptions
>;

Accordion.Content = Content;
interface Components {
  /**
   * The content of the accordion item. Extends [`<Ariakit.DisclosureContent
   * />`](https://ariakit.org/reference/disclosure-content). Rendered as `<div
   * />`.
   *
   * Renders an inner `<div />` container for the content internally. Use
   * `innerProps` to pass props to it.
   *
   * @example
   *
   * ```tsx
   * <Accordion.Item>
   *   ...
   *   <Accordion.Content>Content</Accordion.Content>;
   * </Accordion.Item>;
   * ```
   */
  Content: typeof Content;
}
