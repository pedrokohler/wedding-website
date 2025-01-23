import Stack from "react-bootstrap/Stack";
import HeroBackground from "../assets/bg-hero.png";
import HeroSignature from "../assets/signature-hero.png";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const HeroSection = () => {
  const { isAbove500w } = useMediaQuery();

  const heroSignatureSizingStyles = isAbove500w
    ? {
        left: "35%",
        top: "10%",
        width: "30%",
      }
    : {
        left: "22%",
        top: "20%",
        width: "60%",
      };

  return (
    <Stack
      style={{
        height: "110vh",
        width: "100vw",
      }}
    >
      <img
        src={HeroBackground}
        style={{
          height: "100%",
          objectFit: "cover",
        }}
      />
      <img
        src={HeroSignature}
        style={{
          position: "absolute",
          zIndex: 999,
          ...heroSignatureSizingStyles,
        }}
      />
    </Stack>
  );
};
