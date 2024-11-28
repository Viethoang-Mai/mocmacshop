import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../stores/slices/authSlice";
import Loading from "../components/Loading/Loading";
import { toast } from "react-toastify";

export default function LogoutBtn() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    if (loading) {
        return <Loading />;
    }
    const handleLogout = async () => {
        try {
            setLoading(true);
            const result = await dispatch(logout()).unwrap();
            if (result) {
                setTimeout(() => {
                    setLoading(false);
                    window.location.href = "/";
                }, 1000);
            }
        } catch (error) {
            setLoading(false);
        }
    };
    return (
        <button onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>Logout
        </button>
    );
}
