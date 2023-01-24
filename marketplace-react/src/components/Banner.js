import React from "react";
import macBanner from "../assets/images/mac-banner.jpg";
import "../assets/styles/banner.css";

const Banner = () => {
    return (
        <div id="banner">
            <img src={macBanner} alt="NA" />
        </div>
    );
};

export default Banner;
