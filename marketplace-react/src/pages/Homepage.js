import React, { useEffect } from "react";
// import axios from "axios";
import ProductCard from "../components/Products/ProductCard";

import { fetchAllProducts } from "../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "../features/products/productsSlice";
// import { getStatus } from "../features/products/productsSlice";

import { fetchAllImages } from "../features/products/imageSlice";
import { selectAllImages } from "../features/products/imageSlice";

import Banner from "../components/Banner";

const Homepage = () => {
    // const [products, setProducts] = useState();

    // const url = "http://localhost:5000/api/v1/products";
    // const token =
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzcxZTg2MzIzMWYxMDYyOTIxNjQyZmEiLCJuYW1lIjoic3VqYW4iLCJpYXQiOjE2NzQzNzc4MjQsImV4cCI6MTY3Njk2OTgyNH0.VjejrRMP1pHDIgdKXa4tUDTQr7A4vSeFt5L-wIwciEI";

    // const fetchProducts = async () => {
    //     const response = await axios.get(url, {
    //         headers: {
    //             authorization: `Bearer ${token}`,
    //         },
    //     });
    //     fetchImage(response.data.products);
    // };

    const fetchedProducts = useSelector(selectAll);
    const fetchedImages = useSelector(selectAllImages);

    // const status = useSelector(getStatus());

    // const fetchImage = (productsDetails) => {
    //     const productsWithImage = productsDetails.map(async (product) => {
    //         const image = await axios.get(`${url}/image/${product._id}`, {
    //             headers: {
    //                 authorization: `Bearer ${token}`,
    //             },
    //         });

    //         const productContent = { ...product, image };
    //         return productContent;
    //     });
    //     Promise.all(productsWithImage).then((fulfilledArray) =>
    //         setProducts(fulfilledArray)
    //     );
    // };

    /*
    The API Calls and dispatch is done in the index.js . By doing this, the API calls are made even when pages other than homepage are opened.

    const dispatch = useDispatch();

    const fetchProductsRedux = async () => {
        try {
            await dispatch(fetchAllProducts());
        } catch (error) {
            console.log(error);
        }
    };

    const fetchImagesRedux = async () => {
        try {
            await dispatch(fetchAllImages());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProductsRedux();
    }, []);

    // useEffect(() => {
    //     fetchImage(fetchedProducts);
    // }, [status]);

    useEffect(() => {
        fetchImagesRedux();
    }, []);

    */

    let productsArray;
    if (!fetchedProducts || fetchedProducts.length === 0) {
        productsArray = <h3>Loading...</h3>;
    } else {
        productsArray = fetchedProducts.map((product) => (
            <ProductCard
                key={product._id}
                product={product}
                image={fetchedImages.find(
                    (image) => product._id === image.productId
                )}
            />
        ));
    }

    return (
        <>
            <Banner />

            <div className="productsSection">
                <h2>Products</h2>
                <div className="productsList">{productsArray}</div>
            </div>
        </>
    );
};

export default Homepage;
