import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import "../../assets/styles/forms/addProduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        const data = JSON.stringify({
            name: productName,
            price: productPrice,
            status: "available",
        });
        const name = "imageName";
        const desc = "desc about image";
        const payload = { data, productImage, name, desc };

        const url = `http://localhost:5000/api/v1/products`;
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzcxZTg2MzIzMWYxMDYyOTIxNjQyZmEiLCJuYW1lIjoic3VqYW4iLCJpYXQiOjE2NzQzNzc4MjQsImV4cCI6MTY3Njk2OTgyNH0.VjejrRMP1pHDIgdKXa4tUDTQr7A4vSeFt5L-wIwciEI";

        await axios.post(url, payload, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        navigate("/");
    };

    return (
        <div className="addProductDiv">
            <div className="formUpperSection">
                <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="inputSection">
                <input
                    type="text"
                    placeholder="Enter Product Name"
                    name="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter Product Price"
                    name="productPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />

                <div className="inputImage">
                    <FontAwesomeIcon icon={faImage} />
                    <input
                        type="file"
                        onChange={(e) => setProductImage(e.target.files[0])}
                    />
                </div>
            </div>
            <Button onClickFunction={handleSubmit} buttonText="Submit" />
        </div>
    );
};

export default AddProduct;
