import { Stack } from "react-bootstrap";
import { CountdownSection } from "./Components/CountdownSection";
import { HeroSection } from "./Components/HeroSection";

function App() {
  return (
    <>
      <Stack gap={2}>
        <HeroSection />
        <CountdownSection />
      </Stack>
    </>
  );
}

export default App;
