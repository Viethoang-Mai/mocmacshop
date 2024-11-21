import React from "react";
import { Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Profile from "../pages/Profile/Profile";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import Account from "../pages/Profile/Acount/Account";

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
            </Route>
        </Route>
    </>
);

export default privateRoutes;
