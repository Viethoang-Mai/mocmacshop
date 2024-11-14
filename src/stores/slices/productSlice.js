import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
import { httpClient } from "../../utils/httpClient";
httpClient.baseUrl = SERVER_URL;

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: {},
        ProductDetail: {},
        categories: [],
        status: "idle",
        statusDetail: "idle",
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
                localStorage.setItem(
                    "categories",
                    JSON.stringify(state.categories)
                );
                sessionStorage.setItem(
                    "products",
                    JSON.stringify(state.products)
                );
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "error";
            });
        builder
            .addCase(fetchProductDetail.pending, (state, action) => {
                state.statusDetail = "loading";
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.statusDetail = "success";
                state.ProductDetail = action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.statusDetail = "error";
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
export const fetchProductDetail = createAsyncThunk(
    "fetchProductDetail",
    async (id, { rejectWithValue }) => {
        const response = await fetch(`${SERVER_URL}/products/${id}`);
        const data = await response.json();
        if (!response.ok) {
            return rejectWithValue("Error");
        }
        return data.data;
    }
);

export const { loadedProducts } = productSlice.actions;
