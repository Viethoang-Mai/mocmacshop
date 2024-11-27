import { Routes, Route } from "react-router-dom";
import publicRoutes from "../routes/PublicRoutes";
import privateRoutes from "../routes/PrivateRoutes";
import NotFoundPage from "../components/NotFound/NotFound";

const Layout = () => {
    return (
        <Routes>
            {publicRoutes} {privateRoutes}
            <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
    );
};

export default Layout;
