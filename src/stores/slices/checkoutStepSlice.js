import { createSlice, current } from "@reduxjs/toolkit";
const checkoutStepSlice = createSlice({
    name: "checkoutStep",
    initialState: {
        current: localStorage.getItem("current") || "shipping",
        stepsOrder: ["shipping", "payment", "review"],
        status: "idle",
    },
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload;
            localStorage.setItem("current", action.payload);
        },
    },
});

export const { setCurrent } = checkoutStepSlice.actions;
export default checkoutStepSlice;
