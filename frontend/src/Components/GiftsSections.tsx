import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "../hooks/useMediaQuery";
import FlowerSeparator from "../assets/separador2.svg";
import { PageSeparator } from "./PageSeparator";

export const GiftsSection = () => {
  const { isAbove750w, isAbove1000w } = useMediaQuery();

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
    </Stack>
  );
};
