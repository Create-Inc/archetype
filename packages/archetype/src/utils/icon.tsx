/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactElement,
  useMemo,
} from "react";

export const ICON_SIZE_ESCAPE_SEQUENCE = "123.45";

/** The data of an Archetype icon represented as a JSX fragment. */
export type IconFragmentData = {
  data: ReactElement;
  size?: { width: number; height: number };
  props?: ComponentPropsWithoutRef<"svg">;
};

/** The data of an Archetype icon. */
export type IconData = string | IconFragmentData;

/** Extracts the embedded size from an SVG path. */
export function extractPathIconSize(path: string) {
  const regExpContent = `M${ICON_SIZE_ESCAPE_SEQUENCE.replace(
    ".",
    "\\."
  )} ([0-9.]+)$`;
  const regExp = new RegExp(regExpContent);
  const result = path.match(regExp)?.[1];
  if (!result) return undefined;
  const parts = result.split(".");
  const width = +parts[0]!;
  const height = +parts[1]!;
  return { width, height };
}

/** Extracts the embedded size from an icon fragment object. */
export function extractFragmentIconSize(fragment: IconFragmentData) {
  return fragment?.size;
}

/** Extracts the embedded size from an Archetype icon (`IconData`). Memoized. */
export function useIconSize(data: IconData) {
  return useMemo(() => {
    if (typeof data === "string") return extractPathIconSize(data);
    return extractFragmentIconSize(data);
  }, [data]);
}

const DEFAULT_ICON_SIZE = 20;

/**
 * Computes props for the root SVG element of an Archetype icon (`IconData`).
 * Memoized.
 */
export function useIconSvgProps(
  data: IconData,
  { defaultSize = DEFAULT_ICON_SIZE } = {}
) {
  const { width = defaultSize, height = defaultSize } = useIconSize(data) ?? {};
  return useMemo(() => {
    const isFlat = typeof data === "string";
    const dataProps = isFlat ? {} : data.props;

    const props: ComponentPropsWithoutRef<"svg"> = {
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: 0,
      viewBox: `0 0 ${width} ${height}`,
      xmlns: "http://www.w3.org/2000/svg",
      ...dataProps,
      style: {
        "--at-icon-width": `${width / 16}rem`,
        "--at-icon-height": `${height / 16}rem`,
        ...dataProps?.style,
      } as CSSProperties,
    };

    props.children = isFlat ? (
      // SVG path
      <path d={data} />
    ) : (
      // react node
      data.data
    );

    return props;
  }, [data, height, width]);
}
