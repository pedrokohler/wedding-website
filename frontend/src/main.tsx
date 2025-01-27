import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Buffer as BufferPolyfill } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ModalProvider } from "./contexts/modalContext.tsx";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

declare let Buffer: typeof BufferPolyfill;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
globalThis.Buffer = BufferPolyfill;
console.debug("Buffer Polyfill was defined:", Buffer.from("foo", "hex"));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ModalProvider>
    </HashRouter>
  </StrictMode>
);
