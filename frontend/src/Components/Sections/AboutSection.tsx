import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";

import BirdsSeparator from "../../assets/separador1.svg";
import { PageSeparator } from "../PageSeparator";

export const AboutSection = () => {
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const isAbove1000w = useMediaQuery("(min-width: 1000px)");

  return (
    <Stack
      gap={5}
      style={{
        height: "fit-content",
        width: "100%",
        padding: isAbove1000w
          ? "64px 256px"
          : isAbove750w
          ? "32px 128px"
          : "32px 64px",
      }}
    >
      <PageSeparator icon={BirdsSeparator} />
      <h2 className="text-gold">SOBRE OS NOIVOS</h2>
      <div
        style={{
          color: "black",
          maxWidth: "80%",
          alignSelf: "center",
        }}
      >
        Winny e Pedro descobriram na fé, no cuidado e na amizade a base do amor
        que construíram. Abençoados por essa união, compartilham sonhos, risos e
        até receitas novas com cumplicidade. Ele a protege de forma tão natural
        quanto ela o admira com carinho. Agora, se preparam para o próximo
        capítulo dessa história, com o coração cheio de gratidão e esperança no
        que está por vir.
      </div>
    </Stack>
  );
};
