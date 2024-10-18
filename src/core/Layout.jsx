import { Routes } from "react-router-dom";
import publicRoutes from "../routes/PublicRoutes";

const Layout = () => {
    return <Routes>{publicRoutes}</Routes>;
};

export default Layout;
