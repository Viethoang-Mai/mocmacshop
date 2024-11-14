import { Route } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../layouts/AuthLayout/Login";
import Demo from "../pages/Demo/Demo";
import CategoryItem from "../pages/CategoryItem/CategoryItem";
import Product from "../pages/Products/Product";
import Filter from "../components/Filter";
import ProductDetail from "../pages/Products/ProductDetail";
import Cart from "../pages/Cart/Cart";
import Favorite from "../pages/Favorite/Favorite";
const publicRoutes = (
    <>
        <Route element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/category">
                <Route path=":id" element={<CategoryItem />} />
            </Route>
            <Route path="/product" element={<Filter />}>
                <Route path="search" element={<Filter />} />
            </Route>
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/favorite" element={<Favorite />}></Route>
        </Route>
        <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
        </Route>
    </>
);

export default publicRoutes;
