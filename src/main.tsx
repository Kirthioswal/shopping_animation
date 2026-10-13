import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root")!;

// Hydrate when pre-rendered by react-snap (build:snap), otherwise render.
if (rootElement.hasChildNodes()) hydrateRoot(rootElement, <App />);
else createRoot(rootElement).render(<App />);
