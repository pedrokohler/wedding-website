import { Stack } from "react-bootstrap";
import { CountdownSection } from "./Components/CountdownSection";
import { HeroSection } from "./Components/HeroSection";
import { AboutSection } from "./Components/AboutSection";
import { LocationsSection } from "./Components/LocationsSections";

function App() {
  return (
    <>
      <Stack gap={2}>
        <HeroSection />
        <CountdownSection />
        <AboutSection />
        <LocationsSection />
      </Stack>
    </>
  );
}

export default App;
