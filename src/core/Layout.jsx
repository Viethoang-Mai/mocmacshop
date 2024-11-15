import { Routes } from "react-router-dom";
import publicRoutes from "../routes/PublicRoutes";
import privateRoutes from "../routes/PrivateRoutes";

const Layout = () => {
    return (
        <Routes>
            {publicRoutes} {privateRoutes}
        </Routes>
    );
};

export default Layout;
