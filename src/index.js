import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 주석 풀고 사용 8~9 주석해제
import store from "./redux/config/congifStore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>

    // 주석 풀고 사용 13~15 주석처리
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals();
