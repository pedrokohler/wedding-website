import { Route } from "react-router-dom";
import { HomePage } from "./Pages/Home";
import { GiftsPage } from "./Pages/Gifts";
import { SentryRoutes } from "./sentry";

function App() {
  return (
    <>
      <SentryRoutes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/presentes" element={<GiftsPage />} />
      </SentryRoutes>
    </>
  );
}

export default App;
