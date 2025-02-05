import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {PlayProvider} from "./Context/Play.jsx"

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PlayProvider>
          <AuthContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </AuthContextProvider>
      </PlayProvider>
    </Provider>
  </StrictMode>
);
