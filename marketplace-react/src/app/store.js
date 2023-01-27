import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import imageReducer from "../features/products/imageSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        images: imageReducer,
    },
});
