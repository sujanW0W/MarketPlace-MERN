import React from "react";
import "../assets/styles/button.css";

const Button = ({ buttonText, onClickFunction, nameOfClass }) => {
    return (
        <button className={nameOfClass} onClick={onClickFunction}>
            {buttonText}
        </button>
    );
};

export default Button;
