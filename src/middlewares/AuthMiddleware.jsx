import { Navigate, Outlet } from "react-router-dom";
const isAuthenticated = localStorage.getItem("authenticated");

const AuthMiddleware = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default AuthMiddleware;
