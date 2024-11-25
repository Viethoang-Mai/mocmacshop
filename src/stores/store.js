import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./slices/productSlice";
import { categorySlice } from "./slices/categorySlice";
import { filterProductSlice } from "./slices/filterProductSlice";
import { authSlice } from "./slices/authSlice";
import effectSlice from "./slices/effectSlice";
import { favoriteSlice } from "./slices/favoriteSlice";
import { userSlice } from "./slices/userSlice";
import reviewSlice from "./slices/reviewSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        filters: filterProductSlice.reducer,
        category: categorySlice.reducer,
        auth: authSlice.reducer,
        effect: effectSlice.reducer,
        favorite: favoriteSlice.reducer,
        user: userSlice.reducer,
        reviews: reviewSlice.reducer,
        cart: cartSlice.reducer,
        order: orderSlice.reducer,
    },
});
