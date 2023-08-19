import { useEffect, useMemo, useRef, useState } from "react";

import { useImageIsLoaded } from "./use-image-is-loaded";

/** Computes up to two initials from a name. */
export function computeInitialsFromName(name: string) {
  const matchResult = name?.matchAll(/(\S)\S*/g);
  const matches = [...matchResult].map((r) => r[1]);
  return matches ? `${matches[0]}${matches[1] ?? ""}` : undefined;
}

/**
 * Computes up to two initials from an initials string or, if missing, a name
 * string. Memoized.
 */
export function useComputedInitials(initials?: string, name?: string) {
  return useMemo(() => {
    if (initials) return initials.substring(0, 2).toUpperCase();
    return name ? computeInitialsFromName(name)?.toUpperCase() : undefined;
  }, [initials, name]);
}

/** Computes a number from the characters of an initials string. */
export function computeInitialsMagicNumber(initials: string) {
  const numbers = initials
    .toLowerCase()
    .substring(0, 2)
    .split("")
    .map((char) => char.charCodeAt(0));
  // This will give permutations (e.g. "DG" and "GD") different colors
  // without significantly impacting the probability distribution.
  const spice = (numbers[0] ?? 0) < (numbers[1] ?? 0) ? 0 : 1;
  return numbers.reduce((acc, n) => acc + n) + spice;
}

/** Maps initials to a color in a deterministic way from a set of options. */
export function computeInitialsColor<InitialsColor = string>(
  initials: string,
  colorOptions: readonly InitialsColor[]
) {
  const magicNumber = computeInitialsMagicNumber(initials);
  const colorIndex = magicNumber % colorOptions.length;
  return colorOptions[colorIndex] as InitialsColor;
}

/** The image state of an avatar. */
export type AvatarImageState = "loading" | "loaded" | "fallback" | "none";

/** `The state of an avatar. */
export type AvatarState = "imageLoading" | "image" | "initials" | "fallback";

export type UseAvatarOptions<InitialsColor = string> = {
  /** The url of the image to display. */
  image?: string;

  /** The full name of the user or entity. */
  name?: string;

  /**
   * The initials of the user or entity. If not provided, they will be derived
   * from `name`.
   */
  initials?: string;

  /** Initials color options. The chosen option is returned as `initialsColor`. */
  initialsColorOptions?: readonly InitialsColor[];

  /**
   * The amount of time in milliseconds that the fallback will be delayed while
   * the image loads.
   *
   * @default 1000
   */
  fallbackDelay?: number;
};

/**
 * Utility to build an avatar component. It provides the following features:
 *
 * - Tracks the image loading state as well as the overall avatar state,
 *   indicating whether it should show the image, initials, or a fallback at any
 *   given time.
 * - Computes the initials from the name if not provided.
 * - Picks a background color for displaying initials from the provided options,
 *   using a deterministic algorithm.
 */
export function useAvatar<InitialsColor = string>({
  fallbackDelay = 1000,
  image,
  name,
  initials,
  initialsColorOptions,
}: UseAvatarOptions<InitialsColor>) {
  // compute values and state
  const imageLoaded = useImageIsLoaded(image);
  const computedInitials = useComputedInitials(initials, name);
  const initialsColor =
    computedInitials && initialsColorOptions
      ? computeInitialsColor(computedInitials, initialsColorOptions)
      : undefined;

  // track fallback delay
  const { current: initialFallbackDelay } = useRef(fallbackDelay);
  const [fallbackDelayDone, setFallbackDelayDone] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(
      () => setFallbackDelayDone(true),
      initialFallbackDelay
    );
    return () => clearTimeout(timeout);
  }, [initialFallbackDelay]);

  // track image state
  const imageState = useMemo((): AvatarImageState => {
    if (!image) return "none";
    if (imageLoaded) return "loaded";
    if (fallbackDelayDone) return "fallback";
    return "loading";
  }, [fallbackDelayDone, image, imageLoaded]);

  // track avatar state
  const avatarState = useMemo((): AvatarState => {
    if (imageState === "none" || imageState === "fallback") {
      if (computedInitials) return "initials";
      return "fallback";
    }
    if (imageState === "loaded") return "image";
    return "imageLoading";
  }, [computedInitials, imageState]);

  return {
    avatarState,
    computedInitials,
    initialsColor,
    imageState,
  };
}
