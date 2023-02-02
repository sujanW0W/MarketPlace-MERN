import React, { useEffect, useState } from "react";
import "../assets/styles/navigation.css";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Button from "./Button";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
        localStorage.getItem("accessToken") && setIsLoggedIn(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    let loginElement;

    //IIFE - Immediately Invoked Function Expression
    (() => {
        if (isLoggedIn) {
            let userDetails = jwt_decode(localStorage.getItem("accessToken"));

            loginElement = (
                <li
                    style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                    }}
                >
                    <p style={{ margin: "0px" }}>{userDetails.name}</p>
                    <Button
                        buttonText={"Logout"}
                        onClickFunction={handleLogout}
                    />
                </li>
            );
        } else
            loginElement = (
                <li id="loginNav">
                    <Link to="/user/login"> Login </Link>
                </li>
            );
    })();

    return (
        <>
            <header>
                <h1>MarketPlace</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/addProduct">Add Product</Link>
                        </li>
                        <li>
                            <Link to="/">About</Link>
                        </li>
                        <li>
                            <Link to="/">Contact Us</Link>
                        </li>
                        {loginElement}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
