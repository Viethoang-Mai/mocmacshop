import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
import { httpClient } from "../../utils/httpClient";
httpClient.baseUrl = SERVER_URL;

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: {},
        categories: [],
        status: "idle",
    },
    reducers: {
        loadedProducts(state, action) {
            state.products = action.payload;
            state.status = "success";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.products = action.payload;
                state.categories = action.payload.data.map(
                    ({ id, name, image_url }) => ({
                        id,
                        name,
                        image_url,
                    })
                );
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "error";
            });
    },
});

// get products
export const fetchProducts = createAsyncThunk(
    "fetchProducts",
    async (_, { rejectWithValue }) => {
        // const { response, data } = await httpClient.get("/products");
        const response = await fetch(`${SERVER_URL}/products`);
        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue("Error");
        }
        return data;
    }
);

export const { loadedProducts } = productSlice.actions;
