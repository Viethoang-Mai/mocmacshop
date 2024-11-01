import { Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../layouts/AuthLayout/Login";
import Demo from "../pages/Demo/Demo";
const publicRoutes = (
    <>
        <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/demo" element={<Demo />} />
        </Route>
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
        </Route>
    </>
);

export default publicRoutes;
