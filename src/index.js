import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./sass/main.scss";
import { Provider } from "react-redux";
import {store,persistor} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>
);

// ReactDOMClient.createRoot(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
