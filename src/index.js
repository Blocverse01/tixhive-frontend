import React from "react";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";
import { MoralisProvider } from "react-moralis";

const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APP_ID;
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <MoralisProvider serverUrl={serverUrl} appId={appId}>
        <App />
      </MoralisProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
