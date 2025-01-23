import Stack from "react-bootstrap/Stack";
import { Countdown } from "./Countdown";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const CountdownSection = () => {
  const { isAbove750w } = useMediaQuery();
  return (
    <Stack
      gap={5}
      style={{
        height: "fit-content",
        width: "100%",
        padding: isAbove750w ? "64px" : "32px",
      }}
    >
      <h2>CONTAGEM REGRESSIVA PARA O GRANDE DIA</h2>
      <Countdown />
      <h2
        style={{
          color: "black",
        }}
      >
        Trinta e um de maio de dois mil e vinte e cinco, às quinze horas
      </h2>
    </Stack>
  );
};
