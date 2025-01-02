import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import TanStackRouterProvider from "./router";
import "./index.css";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TanStackRouterProvider />
    </StrictMode>
  );
}
