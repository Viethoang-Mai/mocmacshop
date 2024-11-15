import React from "react";
import { Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Profile from "../pages/Profile/Profile";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const privateRoutes = (
    <>
        <Route element={<DefaultLayout />}>
            <Route element={<AuthMiddleware />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Route>
    </>
);

export default privateRoutes;
