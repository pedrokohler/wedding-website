import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";

import { PageSeparator } from "../../PageSeparator";
import LeafSeparator from "../../../assets/separador4.svg";
import { RSVPForm } from "./RSVPForm";

export const RSVPSection = () => {
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const isAbove1000w = useMediaQuery("(min-width: 1000px)");

  return (
    <Stack
      gap={5}
      style={{
        height: "fit-content",
        width: "100%",
        boxSizing: "border-box",
        padding: isAbove1000w
          ? "256px 32px 32px 32px"
          : isAbove750w
          ? "32px 128px"
          : "32px 64px",
      }}
    >
      {isAbove1000w ? <></> : <PageSeparator icon={LeafSeparator} />}
      <h2 className="text-gold">CONFIRMAR PRESENÇA</h2>
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
