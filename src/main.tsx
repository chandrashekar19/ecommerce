import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "@/styles/globals.css";

// Get the root element
const rootElement = document.getElementById("app");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there is a div with id='app' in your HTML.");
}

// Create root and render
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
