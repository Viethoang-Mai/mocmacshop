import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { categorySlice } from "./slices/categorySlice";
import { filterProductSlice } from "./slices/filterProductSlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        filters: filterProductSlice.reducer,
        category: categorySlice.reducer,
        auth: authSlice.reducer,
    },
});
