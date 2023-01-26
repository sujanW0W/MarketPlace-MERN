import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/Products/ProductCard";

import { fetchAllProducts } from "../features/products/productsSlice";
import { useDispatch } from "react-redux";

const Homepage = () => {
    const [products, setProducts] = useState();

    const url = "http://localhost:5000/api/v1/products";
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzcxZTg2MzIzMWYxMDYyOTIxNjQyZmEiLCJuYW1lIjoic3VqYW4iLCJpYXQiOjE2NzQzNzc4MjQsImV4cCI6MTY3Njk2OTgyNH0.VjejrRMP1pHDIgdKXa4tUDTQr7A4vSeFt5L-wIwciEI";

    const fetchProducts = async () => {
        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        fetchImage(response.data.products);
    };

    const fetchImage = (productsDetails) => {
        const productsWithImage = productsDetails.map(async (product) => {
            const image = await axios.get(`${url}/image/${product._id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            product.image = image.data;
            return product;
        });

        Promise.all(productsWithImage).then((fulfilledArray) =>
            setProducts(fulfilledArray)
        );
    };

    const dispatch = useDispatch();

    const fetchProductsRedux = async () => {
        try {
            await dispatch(fetchAllProducts());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();

        fetchProductsRedux();
    }, []);

    const productsArray =
        products &&
        products.map((product) => (
            <ProductCard key={product._id} product={product} />
        ));

    return (
        <div className="productsSection">
            <h2>Products</h2>
            <div className="productsList">{productsArray}</div>
        </div>
    );
};

export default Homepage;
