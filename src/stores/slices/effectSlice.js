import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const effectSlice = createSlice({
    name: "effect",
    initialState: {
        heightHeader: 0,
        overlay: false,
        dropSearch: false,
        dropUser: false,
        status: "idle",
    },
    reducers: {
        setHeightHeader: (state, action) => {
            state.heightHeader = action.payload;
        },
        setOverlay: (state, action) => {
            state.overlay = action.payload;
        },

        setDropUser: (state, action) => {
            state.dropUser = true;
            state.overlay = true;
        },
        closeDrop: (state, action) => {
            state.dropSearch = false;
            state.dropUser = false;
            state.overlay = false;
        },
    },
});
export const {
    setHeightHeader,
    setOverlay,
    setDropSearch,
    setDropUser,
    closeDrop,
} = effectSlice.actions;
export default effectSlice;
