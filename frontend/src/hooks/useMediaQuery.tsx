import { useEffect, useState } from "react";

export function useMediaQuery() {
  const mediaMatch500w = window.matchMedia("(min-width: 500px)");
  const mediaMatch750w = window.matchMedia("(min-width: 750px)");
  const mediaMatch1000w = window.matchMedia("(min-width: 1000px)");
  const [isAbove500w, setIsAbove500w] = useState(mediaMatch500w.matches);
  const [isAbove750w, setIsAbove750w] = useState(mediaMatch750w.matches);
  const [isAbove1000w, setIsAbove1000w] = useState(mediaMatch1000w.matches);

  useEffect(() => {
    const handler500w = (e: any) => setIsAbove500w(e.matches);
    mediaMatch500w.addListener(handler500w);

    const handler750w = (e: any) => setIsAbove750w(e.matches);
    mediaMatch750w.addListener(handler750w);

    const handler1000w = (e: any) => setIsAbove1000w(e.matches);
    mediaMatch1000w.addListener(handler1000w);

    return () => {
      mediaMatch500w.removeListener(handler500w);
      mediaMatch750w.removeListener(handler750w);
      mediaMatch1000w.removeListener(handler1000w);
    };
  }, [
    setIsAbove500w,
    mediaMatch500w,
    setIsAbove750w,
    mediaMatch750w,
    setIsAbove1000w,
    mediaMatch1000w,
  ]);

  return { isAbove500w, isAbove750w, isAbove1000w };
}
