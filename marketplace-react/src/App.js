import React from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import NotFound from "./components/NotFound";
import AddProduct from "./pages/forms/AddProduct";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import LoginLayout from "./components/LoginLayout";
import EmailVerification from "./pages/forms/EmailVerification";
import ForgotPassword from "./pages/forms/ForgotPassword";

const App = () => {
    return (
        <div className="outermostDiv">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />

                    <Route path="product/:productId">
                        <Route index element={<ProductPage />} />
                    </Route>

                    <Route path="addProduct">
                        <Route index element={<AddProduct />} />
                    </Route>
                </Route>

                <Route path="/user" element={<LoginLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="verifyUser" element={<EmailVerification />} />
                    <Route path="forgotPassword" element={<ForgotPassword />} />
                </Route>

                <Route path="/*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
