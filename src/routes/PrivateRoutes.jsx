import React from "react";
import { Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Profile from "../pages/Profile/Profile";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import Account from "../pages/Profile/Acount/Account";
import Checkout from "../pages/Checkout/Checkout";
import Shipping from "../pages/Checkout/Shipping/Shipping";
import Payment from "../pages/Checkout/Payment/Payment";
import Review from "../pages/Checkout/Review/Review";
import Done from "../pages/Checkout/Done/Done";
import Order from "../pages/Order/Order";
import OrderDetail from "../pages/Order/OrderDetail/OrderDetail";
import ListOrders from "../pages/Order/ListOrders";
import CheckoutGuard from "../middlewares/CheckoutGuard";

const privateRoutes = (
    <>
        <Route element={<DefaultLayout />}>
            <Route element={<AuthMiddleware />}>
                <Route path="/profile" element={<Profile />}>
                    <Route path="account" element={<Account />}></Route>
                    <Route path="security"></Route>
                    <Route path="private-profile"></Route>
                    <Route path="address"></Route>
                    <Route path="privacy"></Route>
                    <Route path="credit-card"></Route>
                </Route>
                <Route path="/checkout" element={<Checkout />}>
                    <Route element={<CheckoutGuard />}>
                        <Route path="shipping" element={<Shipping />}></Route>
                        <Route path="payment" element={<Payment />}></Route>
                        <Route path="review" element={<Review />}></Route>
                        <Route path="done" element={<Done />}></Route>
                    </Route>
                </Route>
                <Route path="/orders" element={<Order />}>
                    <Route index element={<ListOrders />}></Route>
                    <Route path=":id" element={<OrderDetail />} />
                </Route>
            </Route>
        </Route>
    </>
);

export default privateRoutes;
