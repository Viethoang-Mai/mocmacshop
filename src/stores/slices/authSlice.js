import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
import { httpClient } from "../../utils/httpClient";
import { set } from "react-hook-form";
// httpClient.baseUrl = SERVER_URL;

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        showForm: false,
        accessToken: JSON.parse(localStorage.getItem("access_token")) || null,
        isAuthenticated: false,
        user: JSON.parse(localStorage.getItem("user")) || {},
        status: "idle",
        message: "",
        messageRegister: "",
        profile: {},
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
                console.log("action", action);

                state.status = "success";
                state.message = action.payload.message;
                localStorage.setItem(
                    "access_token",
                    JSON.stringify(action.payload.data.accessToken)
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify(action.payload.data.user)
                );
                state.showForm = false;
                window.location.reload();
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

        builder
            .addCase(getProfile.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = "success";
                state.profile = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = "failed";
            });

        builder
            .addCase(logout.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = "success";
                state.accessToken = null;
                state.isAuthenticated = false;
                state.user = {};
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                window.location.href = "/";
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export const login = createAsyncThunk(
    "login",
    async (formData, { rejectWithValue }) => {
        const response = await fetch(`${SERVER_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);
export const getProfile = createAsyncThunk(
    "getProfile",
    async (_, { rejectWithValue }) => {
        const { response, data } = await httpClient.get("/api/auth/profile");

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

        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);
export const logout = createAsyncThunk(
    "logout",
    async (_, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            "/api/auth/logout",
            {}
        );

        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);

export const { setShowForm } = authSlice.actions;

export default authSlice.reducer;
