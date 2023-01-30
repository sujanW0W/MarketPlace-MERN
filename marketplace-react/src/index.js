import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./app/store";
import { Provider } from "react-redux";

import { fetchAllProducts } from "./features/products/productsSlice";
import { fetchAllImages } from "./features/products/imageSlice";
store.dispatch(fetchAllProducts());
store.dispatch(fetchAllImages());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
