import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Helpful runtime debug: log which API URL the production build uses.
// Vercel production builds will have VITE_API_URL set in the dashboard.
// This log appears in the browser console and helps diagnose blank-page issues.
console.log("VITE_API_URL=", import.meta.env.VITE_API_URL);

createRoot(document.getElementById("root")!).render(<App />);
