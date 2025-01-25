import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";

import FlowerSeparator from "../../../assets/separador3.svg";
import { PageSeparator } from "../../PageSeparator";
import { MessageForm } from "./MessageForm";

export const MessageSection = () => {
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
      <PageSeparator icon={FlowerSeparator} />
      <h2>MENSAGEM PARA OS NOIVOS</h2>
      <MessageForm />
    </Stack>
  );
};
