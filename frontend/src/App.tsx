import { Stack } from "react-bootstrap";
import { CountdownSection } from "./Components/Sections/Countdown/CountdownSection";
import { HeroSection } from "./Components/Sections/HeroSection";
import { AboutSection } from "./Components/Sections/AboutSection";
import { LocationsSection } from "./Components/Sections/LocationsSection";
import { RSVPSection } from "./Components/Sections/RSVP/RSVPSection";
import { GiftsSection } from "./Components/Sections/GiftsSection";

function App() {
  return (
    <>
      <Stack gap={2}>
        <HeroSection />
        <CountdownSection />
        <AboutSection />
        <LocationsSection />
        <RSVPSection />
        <GiftsSection />
      </Stack>
    </>
  );
}

export default App;
