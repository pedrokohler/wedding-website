import { Route, Routes } from "react-router-dom";
import { HomePage } from "./Pages/Home";
import { GiftsPage } from "./Pages/Gifts";
import { FooterSection } from "./Components/Sections/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/presentes" element={<GiftsPage />} />
      </Routes>
      <FooterSection />
    </>
  );
}

export default App;
