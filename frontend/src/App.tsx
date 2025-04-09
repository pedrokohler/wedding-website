import { Route } from "react-router-dom";
import { Routes } from "react-router";
import { HomePage } from "./Pages/Home";
import { GiftsPage } from "./Pages/Gifts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/presentes" element={<GiftsPage />} />
      </Routes>
    </>
  );
}

export default App;
