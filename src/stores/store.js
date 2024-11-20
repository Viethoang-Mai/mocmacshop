import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { categorySlice } from "./slices/categorySlice";
import { filterProductSlice } from "./slices/filterProductSlice";
import { authSlice } from "./slices/authSlice";
import effectSlice from "./slices/effectSlice";
import { favoriteSlice } from "./slices/favoriteSlice";

export const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        filters: filterProductSlice.reducer,
        category: categorySlice.reducer,
        auth: authSlice.reducer,
        effect: effectSlice.reducer,
        favorite: favoriteSlice.reducer,
    },
});
