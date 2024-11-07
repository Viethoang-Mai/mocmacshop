import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
import validFilters from "../../utils/validFilters";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;
export const filterProductSlice = createSlice({
    name: "filterProducts",
    initialState: {
        filterProducts: [],
        filters: {
            _category: null,
            _minP: null,
            _maxP: null,
            _sort: null,
            _order: null,
            _minRating: null,
            q: null,
            _page: null,
            _limit: 12,
        },

        status: "idle",
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
            console.log(state.filters);

            sessionStorage.setItem("filters", JSON.stringify(state.filters));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterProducts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchFilterProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.filterProducts = action.payload;
            })
            .addCase(fetchFilterProducts.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export const fetchFilterProducts = createAsyncThunk(
    "fetchFilterProducts",
    async (_, { getState, rejectWithValue }) => {
        const filters = getState().filters.filters;

        const dataValid = validFilters(filters);
        const query = new URLSearchParams(dataValid).toString();
        const { response, data } = await httpClient.get(
            `/products/filter?${query}`
        );
        if (!response.ok) {
            return rejectWithValue("Error");
        }

        return data;
    }
);
export const { setFilters } = filterProductSlice.actions;
export default filterProductSlice.reducer;
