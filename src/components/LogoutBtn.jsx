import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/slices/authSlice";
import Loading from "../components/Loading/Loading";

export default function LogoutBtn() {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const result = await dispatch(logout()).unwrap();
            if (result) {
                setTimeout(() => {
                    window.location.href = "/";
                }, 400);
            }
        } catch (error) {}
    };

    return (
        <>
            <button onClick={handleLogout}>
                {status === "loading" && <Loading />}
                <i className="fa-solid fa-right-from-bracket"></i>Logout
            </button>
        </>
    );
}
