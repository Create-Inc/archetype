import { useEffect, useState } from "react";

// Heavily inspired by Radix UI code:
// https://github.com/radix-ui/primitives/blob/main/packages/react/avatar/src/Avatar.tsx
export function useImageIsLoaded(src?: string) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return setIsLoaded(false);

    let isMounted = true;
    const image = new window.Image();

    const createStatusHandler = (status: boolean) => () => {
      if (isMounted) setIsLoaded(status);
    };

    setIsLoaded(false);
    image.onload = createStatusHandler(true);
    image.onerror = createStatusHandler(false);
    image.src = src;

    return () => {
      isMounted = false;
    };
  }, [src]);

  return isLoaded;
}
