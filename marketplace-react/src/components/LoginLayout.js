import React from "react";
import { Outlet } from "react-router-dom";
import "../assets/styles/forms/loginLayout.css";

const LoginLayout = () => {
    return (
        <div className="loginSection">
            <Outlet />
        </div>
    );
};

export default LoginLayout;
