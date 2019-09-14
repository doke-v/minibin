import "core-js";
import "whatwg-fetch";
import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import store from "./store";
import { StoreProvider } from "easy-peasy";

ReactDOM.render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
