import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";

const App = () => {
    return (
        <div className="outermostDiv">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
