import React from "react";
import ReactDomClient from "react-dom/client";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ContextProvider } from "./context";
import App from "./App";
import "./index.css";

const { createRoot } = ReactDomClient;

const root = createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider
    activeChain={ChainId.Goerli}
  >
    <ContextProvider>
      <App />
    </ContextProvider>
  </ThirdwebProvider>
);
