import { createAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;

export const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        status: "idle",
    },
    reducers: {
        loadedCategories: (state, action) => {
            state.categories = action.payload;
            state.status = "success";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = "success";
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = "error";
            });
    },
});
// get categories
export const fetchCategories = createAsyncThunk(
    "fetchCategories",
    async (_, { rejectWithValue }) => {
        const { response, data } = await httpClient.get("/categories");
        if (!response.ok) {
            return rejectWithValue("Error");
        }
        return data;
    }
);
