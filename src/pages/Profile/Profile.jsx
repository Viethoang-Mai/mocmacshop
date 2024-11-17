import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "../../stores/slices/authSlice";
export default function Profile() {
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        dispatch(getProfile());
    }, []);
    const handleLogout = () => {
        dispatch(logout());
        nav("/");
    };

    return (
        <div>
            Profile
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
