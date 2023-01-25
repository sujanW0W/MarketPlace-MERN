import React from "react";

const ProductCard = (props) => {
    return (
        <div className="cardDiv">
            <img src={props.image} alt="NA" />
            <p>
                <span>{props.name}</span>
                <span>{props.price}</span>
            </p>
        </div>
    );
};

export default ProductCard;
