import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;
export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                sessionStorage.removeItem("shipping");
                sessionStorage.removeItem("checkout");
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
        builder
            .addCase(getOrders.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.status = "failed";
            });
        builder
            .addCase(getOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});
export const createOrder = createAsyncThunk(
    "createOrder",
    async (dataOrder, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            `/api/auth/create-order`,
            {
                ...dataOrder,
            }
        );
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        console.log(data);

        return data;
    }
);
export const getOrders = createAsyncThunk(
    "getOrders",
    async (_, { rejectWithValue }) => {
        const { response, data } = await httpClient.get(`/api/auth/orders`);
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        console.log(data);

        return data;
    }
);
export const getOrder = createAsyncThunk(
    "getOrder",
    async (id, { rejectWithValue }) => {
        const { response, data } = await httpClient.get(
            `/api/auth/orders/${id}`
        );
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        console.log(data);

        return data;
    }
);

export default orderSlice;
