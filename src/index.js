import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";

const firebaseConfig = {
  apiKey: "AIzaSyDuBFuX7POnJRvwuSMzJ4Xrhr-wUysWneQ",
  authDomain: "it-step-847a3.firebaseapp.com",
  databaseURL:
    "https://it-step-847a3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "it-step-847a3",
  storageBucket: "it-step-847a3.appspot.com",
  messagingSenderId: "702869104175",
  appId: "1:702869104175:web:9cfb2ef06fdfe4294bc8da",
  measurementId: "G-EV8N73JMDT",
};

ReactDOM.render(
  <BrowserRouter>
    <App firebaseConfig={firebaseConfig} />
  </BrowserRouter>,
  document.getElementById("root")
);
