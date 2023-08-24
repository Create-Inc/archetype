import { createContext, type ReactNode, useContext } from "react";

export type AccordionValue = string | string[] | undefined;

export type AccordionContextValue = {
  /** Whether the accordion should be animated. */
  animated?: boolean;

  /**
   * The id of the open item, or an array of ids if multiple selection is
   * allowed.
   */
  value?: AccordionValue;

  /**
   * Setter for the value. When called, it is passed the id of the open item, or
   * an array of ids if multiple selection is allowed.
   */
  setValue: (value: AccordionValue) => void;
};

const DEFAULT_VALUE = {
  setValue: () => {
    throw new Error("Accordion context: setValue has not been set");
  },
} satisfies AccordionContextValue;

export const AccordionContext =
  createContext<AccordionContextValue>(DEFAULT_VALUE);

export function AccordionProvider({
  value,
  children,
}: {
  value: AccordionContextValue;
  children?: ReactNode;
}) {
  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
}

export function useAccordionContext() {
  const value = useContext(AccordionContext);
  if (!value) throw new Error("Accordion context missing");
  return value;
}
