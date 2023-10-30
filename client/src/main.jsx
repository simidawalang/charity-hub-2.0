import React from "react";
import ReactDomClient from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";

const { createRoot } = ReactDomClient;

const root = createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    <App />
  </ThirdwebProvider>
);
