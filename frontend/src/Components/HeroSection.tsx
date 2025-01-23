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
        left: "35%",
        top: "5%",
        width: "30%",
      };

  return (
    <Stack
      style={{
        height: "fit-content",
        width: "fit-content",
      }}
    >
      <img
        src={HeroBackground}
        style={{
          height: "100%",
          width: "100%",
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
