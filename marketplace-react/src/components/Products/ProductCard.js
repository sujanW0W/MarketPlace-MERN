import React from "react";
import "../../assets/styles/products/productCard.css";
import { Link } from "react-router-dom";

//Function for converting image data Buffer into base64.
const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);

    return window.btoa(binary);
};

//Invokes function to get base64 and returns the string for "src" property.
export const getImage = (imgObj) => {
    if (!imgObj) return "";

    // const base64String = btoa(
    //     String.fromCharCode(...new Uint8Array(imgObj.image.data.data))
    // );
    // const base64String = Buffer.from(
    //     String.fromCharCode(...new Uint8Array(imgObj.image.data.data))
    // ).toString("base64");

    const base64String = arrayBufferToBase64(imgObj.image.data.data);
    return `data:image/png;base64,${base64String}`;
};

const ProductCard = ({ product, image }) => {
    return (
        <div className="cardDiv">
            <div className="productImage">
                <Link to={`/product/${product._id}`}>
                    <img src={getImage(image)} alt="NA" />
                </Link>
            </div>
            <div className="productDetails">
                <h3>{product.name}</h3>
                <span>${product.price}</span>
            </div>
        </div>
    );
};

export default ProductCard;
