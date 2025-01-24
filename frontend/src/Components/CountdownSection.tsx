import Stack from "react-bootstrap/Stack";
import { Countdown } from "./Countdown";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const CountdownSection = () => {
  const { isAbove750w, isAbove1000w } = useMediaQuery();
  return (
    <Stack
      gap={5}
      style={{
        height: "fit-content",
        width: "100%",
        padding: isAbove1000w
          ? "64px 128px"
          : isAbove750w
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
