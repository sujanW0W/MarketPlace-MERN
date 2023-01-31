import React from "react";
import "../assets/styles/button.css";

const Button = ({ buttonText, onClickFunction }) => {
    return <button onClick={onClickFunction}>{buttonText}</button>;
};

export default Button;
