import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {PlayProvider} from "./Context/Play.jsx"
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayProvider>
      <App />
    </PlayProvider>
  </StrictMode>
);
