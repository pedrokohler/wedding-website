import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";

import FlowerSeparator from "../../assets/separador2.svg";
import { PageSeparator } from "../PageSeparator";
import GiftGrid from "../GiftGrid";

export const GiftsSection = () => {
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
      <h2>LISTA DE PRESENTES</h2>
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
      <GiftGrid />
    </Stack>
  );
};
