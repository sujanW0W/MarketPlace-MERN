import React, { useState, useEffect } from "react";
import axios from "axios";

const Homepage = () => {
    const [products, setProducts] = useState();

    const url = "http://localhost:5000/api/v1/products/";
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzcxZTg2MzIzMWYxMDYyOTIxNjQyZmEiLCJuYW1lIjoic3VqYW4iLCJpYXQiOjE2NzQzNzc4MjQsImV4cCI6MTY3Njk2OTgyNH0.VjejrRMP1pHDIgdKXa4tUDTQr7A4vSeFt5L-wIwciEI";

    const fetchProducts = async () => {
        const response = await axios.get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        setProducts(response.data.products);
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    const productsArray =
        products &&
        products.map((product) => (
            <div key={product._id}>
                {console.log(product)}
                <p>
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                </p>
            </div>
        ));

    return (
        <div>
            <h2>Products</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis inventore sapiente ipsa, commodi ad aperiam quibusdam
                debitis reprehenderit voluptas temporibus, a repellendus autem
                placeat praesentium dignissimos, provident molestias maiores.
                Suscipit? Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Repellendus expedita dignissimos beatae laborum! Autem
                accusantium saepe optio magnam, dolorum deserunt nemo maxime,
                incidunt nisi, distinctio consectetur et numquam quos ex?
            </p>
            {productsArray}
        </div>
    );
};

export default Homepage;
