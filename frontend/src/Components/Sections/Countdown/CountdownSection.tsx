import { forwardRef, LegacyRef } from "react";
import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";

import { Countdown } from "./Countdown";

const CountdownSection = (
  _props: unknown,
  ref: LegacyRef<HTMLHeadingElement> | undefined
) => {
  const isAbove770w = useMediaQuery("(min-width: 770px)");
  const isAbove1080w = useMediaQuery("(min-width: 1080px)");

  return (
    <Stack
      gap={5}
      style={{
        height: "fit-content",
        width: "100%",
        padding: isAbove1080w
          ? "64px 128px"
          : isAbove770w
          ? "32px 64px"
          : "32px 32px",
      }}
    >
      <h2
        className="text-gold"
        style={{
          maxWidth: "80%",
          alignSelf: "center",
        }}
        ref={ref}
      >
        CONTAGEM REGRESSIVA PARA O GRANDE DIA
      </h2>
      <Countdown />
      <h2
        style={{
          maxWidth: "80%",
          alignSelf: "center",
        }}
      >
        31 de maio de 2025, às 14:30
      </h2>
    </Stack>
  );
};

export default forwardRef(CountdownSection);
