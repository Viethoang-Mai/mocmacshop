import { Navigate, Outlet } from "react-router-dom";
const accessToken = localStorage.getItem("access_token");
import { setShowForm } from "../stores/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AuthMiddleware = () => {
    const dispatch = useDispatch();
    if (accessToken) {
        return <Outlet />;
    } else {
        setTimeout(() => {
            dispatch(setShowForm(true));
        });
    }
};

export default AuthMiddleware;
