import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const productsAdapter = createEntityAdapter({
    selectId: (product) => product._id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const productsURL = "http://localhost:5000/api/v1/products";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzcxZTg2MzIzMWYxMDYyOTIxNjQyZmEiLCJuYW1lIjoic3VqYW4iLCJpYXQiOjE2NzQzNzc4MjQsImV4cCI6MTY3Njk2OTgyNH0.VjejrRMP1pHDIgdKXa4tUDTQr7A4vSeFt5L-wIwciEI";

export const fetchAllProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async () => {
        const response = await axios.get(productsURL, {
            headers: { authorization: `Bearer ${token}` },
        });

        return response.data.products;
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState: productsAdapter.getInitialState({
        status: "idle", // 'idle' || 'pending' || 'fulfilled' || 'rejected'
        error: null,
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.status = "Loading...";
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.status = "Succeeded.";
                productsAdapter.upsertMany(state, action.payload);
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.status = "Failed.";
                state.error = action.error.message;
            });
    },
});

export const {
    selectIds,
    selectAll,
    selectById: selectProductById,
} = productsAdapter.getSelectors((state) => state.products);

export const getStatus = () => (state) => state.products.status;

// export const {} = productsSlice.actions;

export default productsSlice.reducer;
