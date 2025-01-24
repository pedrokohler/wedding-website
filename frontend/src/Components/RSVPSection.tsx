import Stack from "react-bootstrap/Stack";
import { PageSeparator } from "./PageSeparator";
import { useMediaQuery } from "../hooks/useMediaQuery";
import LeafSeparator from "../assets/separador4.png";
import { RSVPForm } from "./RSVPForm";

export const RSVPSection = () => {
  const { isAbove750w, isAbove1000w } = useMediaQuery();

  return (
    <Stack
      gap={5}
      style={{
        height: "fit-content",
        width: "100%",
        boxSizing: "border-box",
        padding: isAbove1000w
          ? "256px 32px 256px"
          : isAbove750w
          ? "32px 128px"
          : "32px 64px",
      }}
    >
      {isAbove1000w ? <></> : <PageSeparator icon={LeafSeparator} />}
      <h2>CONFIRMAR PRESENÇA</h2>
      <div
        style={{
          color: "black",
          maxWidth: "80%",
          alignSelf: "center",
        }}
      >
        Donec dignissim et libero sed congue. Cras sit amet vestibulum diam.
        Etiam ut varius turpis. Proin luctus efficitur mi, nec sollicitudin
        tellus tincidunt sed.
      </div>
      <RSVPForm />
    </Stack>
  );
};
