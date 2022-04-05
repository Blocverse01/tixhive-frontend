import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Moralis from "moralis";

const serverUrl =
  process.env.REACT_APP_MORALIS_SERVER_URL ||
  "https://x7nrtds8d6co.usemoralis.com:2053/server";
const appId =
  process.env.REACT_APP_MORALIS_APP_ID ||
  "nIIs4GfuwCkCKhqSNVxlVQ0MD4632foP3UGgP06L";

Moralis.start({
  serverUrl,
  appId,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
