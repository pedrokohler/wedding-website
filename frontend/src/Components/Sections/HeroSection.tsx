import { RefObject, useState } from "react";
import Stack from "react-bootstrap/Stack";
import { useEventListener, useMediaQuery, useTimeout } from "usehooks-ts";

import HeroBackground from "../../assets/bg-hero.png";
import HeroSignature from "../../assets/signature-hero.png";
import ArrowDown from "../../assets/seta.svg";

const MIN_SCROLL_Y = 300;

export const HeroSection = ({
  jumpToRef,
}: {
  jumpToRef: RefObject<HTMLHeadingElement | undefined>;
}) => {
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [isArrowVisible, setIsArrowVisible] = useState(false);
  const isAbove500w = useMediaQuery("(min-width: 500px)");

  useTimeout(() => {
    if (!hasScrolledDown && window.scrollY < MIN_SCROLL_Y) {
      setIsArrowVisible(true);
    }
  }, 3000);

  useEventListener(
    "scrollend",
    () => {
      if (window.scrollY >= MIN_SCROLL_Y) {
        setHasScrolledDown(true);
        setIsArrowVisible(false);
      }
    },
    undefined
    // { once: true }
  );

  const heroSignatureSizingStyles = isAbove500w
    ? {
        left: "35%",
        top: "10%",
        width: "30%",
      }
    : {
        left: "22%",
        top: "20%",
        width: "60%",
      };

  return (
    <Stack
      style={{
        height: "105vh",
        width: "100vw",
      }}
    >
      <img
        src={HeroBackground}
        style={{
          height: "100%",
          objectFit: "cover",
        }}
      />
      <img
        src={HeroSignature}
        style={{
          position: "absolute",
          zIndex: 999,
          ...heroSignatureSizingStyles,
        }}
      />
      {isArrowVisible && (
        <div className="animated-arrow" style={{ cursor: "pointer" }}>
          <img
            src={ArrowDown}
            onClick={() => {
              jumpToRef.current?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          />
        </div>
      )}
    </Stack>
  );
};
