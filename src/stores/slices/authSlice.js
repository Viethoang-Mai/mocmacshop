import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
import { httpClient } from "../../utils/httpClient";
httpClient.baseUrl = SERVER_URL;
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        showForm: false,
        isAuthenticated: false,
        user: {},
        status: "idle",
        message: "",
        messageRegister: "",
    },
    reducers: {
        setShowForm: (state, action) => {
            state.showForm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "success";
                state.isAuthenticated = true;
                state.message = action.payload.message;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.payload;
            });
        builder
            .addCase(postRegister.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(postRegister.fulfilled, (state, action) => {
                state.status = "success";
                state.messageRegister = action.payload.message;
            })
            .addCase(postRegister.rejected, (state, action) => {
                state.status = "failed";
                state.messageRegister = action.payload;
            });
    },
});

export const login = createAsyncThunk(
    "login",
    async (formData, { rejectWithValue }) => {
        const { response, data } = await httpClient.post("/api/auth/login", {
            ...formData,
        });

        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);
export const postRegister = createAsyncThunk(
    "register",
    async (formData, { rejectWithValue }) => {
        const { response, data } = await httpClient.post("/register", {
            ...formData,
        });
        console.log(response, data);
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);

export const { setShowForm } = authSlice.actions;

export default authSlice.reducer;
