import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
import { toast } from "react-toastify";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: JSON.parse(localStorage.getItem("cart")) || [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getListCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload.data;

                localStorage.setItem(
                    "cart",
                    JSON.stringify(action.payload.data)
                );
            })
            .addCase(getListCart.rejected, (state) => {
                state.status = "failed";
            });
        builder
            .addCase(addToCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload.data;

                localStorage.setItem(
                    "cart",
                    JSON.stringify(action.payload.data)
                );
                toast.success("Add to cart successfully");
            })
            .addCase(addToCart.rejected, (state) => {
                state.status = "failed";
            });
        builder
            .addCase(removeFromCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload.data;
                localStorage.setItem(
                    "cart",
                    JSON.stringify(action.payload.data)
                );
                toast.success("Remove from cart successfully");
            })
            .addCase(removeFromCart.rejected, (state) => {
                state.status = "failed";
            });
        builder
            .addCase(updateCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.status = "success";
                state.cart = action.payload.data;
                localStorage.setItem(
                    "cart",
                    JSON.stringify(action.payload.data)
                );
                toast.success("Update cart successfully");
            })
            .addCase(updateCart.rejected, (state) => {
                state.status = "failed";
            });
    },
});
export const getListCart = createAsyncThunk(
    "getListCart",
    async (_, { rejectWithValue }) => {
        const { response, data } = await httpClient.get(`/api/auth/carts`);
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        return data;
    }
);
export const addToCart = createAsyncThunk(
    "addToCart",
    async (dataAdd, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            `/api/auth/add-to-cart`,
            {
                ...dataAdd,
            }
        );
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        return data;
    }
);
export const removeFromCart = createAsyncThunk(
    "removeFromCart",
    async (dataRemove, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            `/api/auth/remove-from-cart`,
            {
                ...dataRemove,
            }
        );
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        return data;
    }
);
export const updateCart = createAsyncThunk(
    "updateCart",
    async (dataUpdate, { rejectWithValue }) => {
        const { response, data } = await httpClient.patch(
            `/api/auth/update-cart`,
            {
                ...dataUpdate,
            }
        );
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        return data;
    }
);

export default cartSlice;
