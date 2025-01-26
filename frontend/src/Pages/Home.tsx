import { Stack } from "react-bootstrap";
import CountdownSection from "../Components/Sections/Countdown/CountdownSection";
import { HeroSection } from "../Components/Sections/HeroSection";
import { AboutSection } from "../Components/Sections/AboutSection";
import { LocationsSection } from "../Components/Sections/LocationsSection";
import { RSVPSection } from "../Components/Sections/RSVP/RSVPSection";
import { GiftsSection } from "../Components/Sections/GiftsSection";
import { MessageSection } from "../Components/Sections/Message/MessageSection";
import { useRef } from "react";

export const HomePage = () => {
  const ref = useRef<HTMLHeadingElement>(null);
  return (
    <Stack gap={2}>
      <HeroSection jumpToRef={ref} />
      <CountdownSection ref={ref} />
      <AboutSection />
      <LocationsSection />
      <RSVPSection />
      <GiftsSection />
      <MessageSection />
    </Stack>
  );
};
