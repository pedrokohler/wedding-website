import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "../hooks/useMediaQuery";
import BirdsSeparator from "../assets/separador1.png";

export const AboutSection = () => {
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
          ? "64px 128px"
          : "64px 64px",
      }}
    >
      <div>
        <img src={BirdsSeparator} />
      </div>
      <h2>SOBRE OS NOIVOS</h2>
      <div
        style={{
          color: "black",
          maxWidth: "80%",
          alignSelf: "center",
        }}
      >
        Donec dignissim et libero sed congue. Cras sit amet vestibulum diam.
        Etiam ut varius turpis. Proin luctus efficitur mi, nec sollicitudin
        tellus tincidunt sed. Phasellus id ante lectus. Cras tempus augue a
        dignissim ultrices. Etiam a efficitur metus, quis porttitor purus.
        Mauris in lectus non dolor ultrices cursus ac et nunc. Pellentesque ac
        lectus vel nisi tincidunt condimentum ac a risus.
      </div>
    </Stack>
  );
};
