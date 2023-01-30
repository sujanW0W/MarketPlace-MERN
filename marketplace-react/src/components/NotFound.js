import React from "react";
import notFound from "../assets/images/404.jpg";

const NotFound = () => {
    const notFoundStyle = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    return (
        <div style={notFoundStyle}>
            <img
                src={notFound}
                alt="Not Found"
                style={{ width: "50%", height: "auto" }}
            />
            <h1 style={{ fontSize: "40px", color: "#3B1777" }}>Not Found!</h1>
        </div>
    );
};

export default NotFound;
