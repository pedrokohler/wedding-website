import { useState } from "react";
import monograma from "./assets/monograma.png";

function App() {
  return (
    <>
      {/* <img src={monograma} style={{ width: "200px", height: "200px" }} /> */}
      <div
        style={{
          margin: "2em",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontFamily: "slight", fontSize: "3em" }}>
          Winny & Pedro
        </div>
      </div>
    </>
  );
}

export default App;
