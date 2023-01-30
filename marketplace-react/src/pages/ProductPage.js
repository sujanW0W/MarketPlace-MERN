import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllImages } from "../features/products/imageSlice";
import { selectProductById } from "../features/products/productsSlice";

import { getImage } from "../components/Products/ProductCard";
import "../assets/styles/products/productPage.css";

const ProductPage = () => {
    const { productId } = useParams();

    const product = useSelector((state) => selectProductById(state, productId));

    const allImages = useSelector(selectAllImages);

    const productImage = allImages.find(
        (image) => product._id === image.productId
    );

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <div className="productPageDiv">
            <div className="productPageImage">
                {productImage ? (
                    <img src={getImage(productImage)} alt="NA" />
                ) : (
                    "Loading..."
                )}
            </div>
            <div className="productPageDetails">
                <h2>{product?.name}</h2>
                <p className="productDescription">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                    quae facilis et maxime blanditiis minima fugit voluptas.
                    Mollitia facilis aliquam neque delectus, nesciunt adipisci
                    reprehenderit expedita, dolore consequuntur repudiandae cum!
                </p>
                <p className="productPrice">${product?.price}</p>
            </div>
        </div>
    );
};

export default ProductPage;
