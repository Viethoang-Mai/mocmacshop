import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        favorite: [],
        status: "idle",
        statusAction: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.pending, (state) => {
                state.statusAction = "loading";
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.statusAction = "succeeded";
                toast.success("Add favorite successfully");
            })
            .addCase(addFavorite.rejected, (state) => {
                state.statusAction = "failed";
            });

        builder
            .addCase(removeFavorite.pending, (state) => {
                state.statusAction = "loading";
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.statusAction = "succeeded";
                toast.success("Remove favorite successfully");
            })
            .addCase(removeFavorite.rejected, (state) => {
                state.statusAction = "failed";
            });

        builder
            .addCase(getFavorite.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getFavorite.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.favorite = action.payload.data;
            })
            .addCase(getFavorite.rejected, (state) => {
                state.status = "failed";
            });
    },
});
export const addFavorite = createAsyncThunk(
    "addFavorite",
    async (productId, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            "/api/auth/add-favorite",
            {
                product_id: productId,
            }
        );

        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);
export const removeFavorite = createAsyncThunk(
    "removeFavorite",
    async (productId, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            "/api/auth/remove-favorite",
            {
                product_id: productId,
            }
        );

        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);
export const getFavorite = createAsyncThunk(
    "favorite",
    async (_, { rejectWithValue }) => {
        const { response, data } = await httpClient.get(
            "/api/auth/favorites-list"
        );

        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);

export default favoriteSlice.reducer;
