import React from "react";
import ReactDOM from "react-dom/client";
import { injectGlobal } from "@emotion/css";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

injectGlobal(`
  *{
    fontfamily: "Roboto", sans-serif;
  }
 #root {
  height: 100vh; width: 100vw;
 }
 
`);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
