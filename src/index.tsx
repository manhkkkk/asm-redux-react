import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.min.css';
import { Provider } from "react-redux";
import { store } from './redux/store'
ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </Provider>,
   document.getElementById("root")
);
