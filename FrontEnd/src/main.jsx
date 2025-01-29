import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import HomeRoutes from "./Routes/HomeRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HomeRoutes />
    </BrowserRouter>
  </StrictMode>
);
