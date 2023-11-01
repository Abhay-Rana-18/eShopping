import "./index.css";
import ReactDOM from 'react-dom/client';
import App from "./App"
import reportWebVitals from "./reportWebVitals";

import * as React from "react";

//AOS.init();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
