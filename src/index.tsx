import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import "./index.css";
import App from "./components/App";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
