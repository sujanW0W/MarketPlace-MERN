import React from "react";
import "../assets/styles/navigation.css";
import { Link } from "react-router-dom";
import Banner from "./Banner";

const Header = () => {
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
                            <Link to="/">Products</Link>
                        </li>
                        <li>
                            <Link to="/">About</Link>
                        </li>
                        <li>
                            <Link to="/">Contact Us</Link>
                        </li>
                        <li id="loginNav">
                            <Link to="/"> Login </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Banner />
        </>
    );
};

export default Header;
