import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import clsx from "clsx";
import styles from "../form.module.css";
import { loginGoogle } from "../../../stores/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
export default function BtnGGLogin() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setLoading(true);
                const res = await dispatch(
                    loginGoogle({
                        token: tokenResponse.access_token,
                        expires_in: tokenResponse.expires_in,
                    })
                ).unwrap();
                if (res) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 400);
                }
            } catch (error) {}
        },
        onError: (error) => console.log("Login Failed:", error),
    });
    return (
        <>
            <button
                disabled={loading}
                onClick={() => login()}
                className={clsx(styles["btn-social"])}
            >
                {loading ? (
                    <i className="fa fa-spinner fa-spin animate-spin"></i>
                ) : (
                    <>
                        <i className="fa-brands fa-google"></i>Continue with
                        Google
                    </>
                )}
            </button>
        </>
    );
}
