import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";

import { Countdown } from "./Countdown";

export const CountdownSection = () => {
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
        style={{
          maxWidth: "80%",
          alignSelf: "center",
        }}
      >
        CONTAGEM REGRESSIVA PARA O GRANDE DIA
      </h2>
      <Countdown />
      <h2
        style={{
          color: "black",
          maxWidth: "80%",
          alignSelf: "center",
        }}
      >
        31 de maio de 2025, às 15:00 em ponto
      </h2>
    </Stack>
  );
};
