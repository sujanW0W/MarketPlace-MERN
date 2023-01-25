import React, { useState, useEffect } from "react";
import axios from "axios";

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

    useEffect(() => {
        fetchProducts();
    }, []);

    const getImage = (imgObj) => {
        if (!imgObj) return <img src="" alt="NA" />;
        const base64String = btoa(
            String.fromCharCode(...new Uint8Array(imgObj.image.data.data))
        );
        return <img src={`data:image/png;base64,${base64String}`} alt="NA" />;
    };

    const productsArray =
        products &&
        products.map((product) => (
            <div key={product._id}>
                <p>
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                    {getImage(product.image)}
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
