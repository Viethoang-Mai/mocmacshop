import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        favorite: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavorite.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.favorite = action.payload;
            })
            .addCase(addFavorite.rejected, (state) => {
                state.status = "failed";
            });

        builder
            .addCase(removeFavorite.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.favorite = action.payload;
            })
            .addCase(removeFavorite.rejected, (state) => {
                state.status = "failed";
                state.favorite = [];
            });

        builder
            .addCase(getFavorite.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getFavorite.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.favorite = action.payload;
            })
            .addCase(getFavorite.rejected, (state) => {
                state.status = "failed";
                state.favorite = [];
            });
    },
});
export const addFavorite = createAsyncThunk(
    "favorite",
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
    "favorite",
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
        const { response, data } = await httpClient.post(
            "/api/auth/favorites-list"
        );

        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);

export default favoriteSlice.reducer;
