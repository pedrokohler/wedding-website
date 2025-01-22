import { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import HeroBackground from "../assets/bg-hero.png";
import HeroSignature from "../assets/signature-hero.png";

export const HeroSection = () => {
  const mediaMatch = window.matchMedia("(min-width: 500px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: any) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  }, [setMatches, mediaMatch]);

  const heroSignatureSizingStyles = matches
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
