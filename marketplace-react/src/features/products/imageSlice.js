import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const imageAdapter = createEntityAdapter({
    selectId: (state) => state._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = imageAdapter.getInitialState({
    status: "idle",
    error: null,
});

const imageURL = `http://localhost:5000/api/v1/products/image`;
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzcxZTg2MzIzMWYxMDYyOTIxNjQyZmEiLCJuYW1lIjoic3VqYW4iLCJpYXQiOjE2NzQzNzc4MjQsImV4cCI6MTY3Njk2OTgyNH0.VjejrRMP1pHDIgdKXa4tUDTQr7A4vSeFt5L-wIwciEI";

const imageAPICall = async (productId) => {
    const response = await axios.get(`${imageURL}/${productId}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchAllImages = createAsyncThunk(
    "images/fetchAllImages",
    async (products) => {
        if (!products || products.length === 0) return;

        const imagesResponse = await products.map((product) => {
            const imageObj = imageAPICall(product._id);
            return imageObj;
        });

        let imagesArray;
        await Promise.all(imagesResponse).then((fulfilledPromise) => {
            imagesArray = fulfilledPromise;
        });
        return imagesArray;
    }
);

export const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllImages.pending, (state, action) => {
                state.status = "Loading...";
            })
            .addCase(fetchAllImages.fulfilled, (state, action) => {
                state.status = "Succeeded...";
                imageAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchAllImages.rejected, (state, action) => {
                state.status = "Failed...";
                state.error = action.error.message;
            });
    },
});

export const {
    selectIds,
    selectAll: selectAllImages,
    selectById: selectImageById,
} = imageAdapter.getSelectors((state) => state.images);

export default imageSlice.reducer;
