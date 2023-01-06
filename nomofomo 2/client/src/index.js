import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import "react-datepicker/dist/react-datepicker.css";
import "react-responsive-modal/styles.css";
import "react-vertical-timeline-component/style.min.css";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
