import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        status: "idle",
    },
    reducers: {},
});
export const changeName = createAsyncThunk(
    "changeName",
    async (name, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            "/api/auth/change-name",
            {
                name,
            }
        );
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        return data;
    }
);
export const changePassword = createAsyncThunk(
    "changePassword",
    async (oldPassword, password, confirmPassword, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            "/api/auth/change-password",
            {
                oldPassword,
                password,
                confirmPassword,
            }
        );
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        return data;
    }
);
export const changeEmail = createAsyncThunk(
    "changeEmail",
    async (password, email, confirmEmail, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            "/api/auth/change-email",
            {
                password,
                email,
                confirmEmail,
            }
        );
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }
        return data;
    }
);

export default userSlice.reducer;
