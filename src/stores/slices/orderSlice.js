import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
import { toast } from "react-toastify";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;
export const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: [],
        listOrders: [],
        isLoading: false,
        statusList: "idle",
        statusOrder: "idle",
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
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
                toast.error("Create order failed");
            });
        builder
            .addCase(getOrders.pending, (state) => {
                state.statusList = "loading";
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.statusList = "succeeded";
                state.listOrders = action.payload.data;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.statusList = "failed";
            });
        builder
            .addCase(getOrder.pending, (state) => {
                state.statusOrder = "loading";
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.statusOrder = "succeeded";
                state.order = action.payload.data;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.statusOrder = "failed";
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

        return data;
    }
);

export default orderSlice;
