import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
    return (
        <div className="outermostDiv">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="index" />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
