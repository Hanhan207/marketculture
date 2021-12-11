import React from "react";
// import reactDom from "react-dom";
import ReactDOM from "react-dom";
import "./App.css";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";

reportWebVitals();

let element = (
  <div>
    <h1>Hello</h1>
  </div>
);

ReactDOM.render(element, document.querySelector("#root"));
