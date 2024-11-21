import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../utils/httpClient";
import { toast } from "react-toastify";
const SERVER_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
httpClient.baseUrl = SERVER_URL;

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || {},
        status: "idle",
        message: "",
        messageChangePassword: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeName.pending, (state) => {
                state.status = "loading";
            })
            .addCase(changeName.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.data;
                state.message = action.payload;

                localStorage.setItem(
                    "user",
                    JSON.stringify(action.payload.data)
                );
            })
            .addCase(changeName.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.payload;
            });
        builder
            .addCase(changeEmail.pending, (state) => {
                state.status = "loading";
            })
            .addCase(changeEmail.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.data;
                state.message = action.payload.message;

                localStorage.setItem(
                    "user",
                    JSON.stringify(action.payload.data)
                );
            })
            .addCase(changeEmail.rejected, (state, action) => {
                state.status = "failed";
                state.message = action.payload;
            });
        builder
            .addCase(changePassword.pending, (state) => {
                state.status = "loading";
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload.data;
                state.messageChangePassword = action.payload.message;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = "failed";
                state.messageChangePassword = action.payload;
            });
    },
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
    async (formData, { rejectWithValue }) => {
        const { response, data } = await httpClient.post(
            "/api/auth/change-password",
            {
                ...formData,
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
    async (formData, { rejectWithValue }) => {
        console.log(formData);

        const { response, data } = await httpClient.post(
            "/api/auth/change-email",
            {
                ...formData,
            }
        );
        if (!response.ok) {
            return rejectWithValue(data.errors);
        }

        return data;
    }
);

export default userSlice.reducer;
