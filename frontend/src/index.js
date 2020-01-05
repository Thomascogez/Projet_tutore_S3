import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "react-widgets/dist/css/react-widgets.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "react-toastify/dist/ReactToastify.min.css";
import store from "./app/providers/store";
import { Provider } from "react-redux";
import NavBar from "./app/components/layouts/Navbar";

ReactDOM.render(
    <>
  <Provider store={store}>
    <NavBar />
    <App />
  </Provider>
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
