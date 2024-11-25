import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;

export const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        status: "idle",
    },
    reducers: {},
});

export default reviewSlice;
