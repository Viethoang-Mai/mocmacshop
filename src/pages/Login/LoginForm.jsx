import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./form.module.css";
import clsx from "clsx";
import { login } from "../../stores/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import emailRegEx from "../../utils/regexEmail";
import { Helmet } from "react-helmet-async";
export default function LoginForm() {
    const dispatch = useDispatch();
    const { message, status } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .matches(emailRegEx, "Email is not valid")
            .required("Please enter your email"),
        password: Yup.string()
            .min(6, "Password is too short")
            .required("Please enter your password"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: "vhm@gmail.com",
            password: "123321",
        },
    });

    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true);
            const res = await dispatch(login({ email, password })).unwrap();
            if (res) {
                setTimeout(() => {
                    setLoading(false);
                    window.location.reload();
                }, 400);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login || Mocmacshop</title>
            </Helmet>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="mb-1">
                {message && (
                    <p
                        className={clsx(
                            styles["message"],
                            status === "success" ? "" : styles["error-m"]
                        )}
                    >
                        {message}
                    </p>
                )}

                <div className={clsx(styles["form-content"])}>
                    <div className={clsx(styles["group-input"])}>
                        <label>
                            <span>Email address</span>
                            <input type="email" {...register("email")} />
                        </label>
                        {errors.email && (
                            <p className={clsx(styles["error"])}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className={clsx(styles["group-input"])}>
                        <label>
                            <span>Password</span>
                            <div className={clsx(styles["input-password"])}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                />
                                <span
                                    className={clsx(styles["eye"])}
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <i className="fa-regular fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa-regular fa-eye"></i>
                                    )}
                                </span>
                            </div>
                        </label>
                        {errors.password && (
                            <p className={clsx(styles["error"])}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="text-right mb-4">
                    <a
                        href="#!"
                        className="text-gray-700 underline text-xs hover:text-amber-500"
                    >
                        Forgot your password?
                    </a>
                </div>
                <button
                    disabled={loading}
                    className={clsx(
                        styles["btn-form"],
                        loading ? "bg-gray-400" : ""
                    )}
                >
                    {loading ? (
                        <i className="fa-solid fa-spinner animate-spin"></i>
                    ) : (
                        "Login"
                    )}
                </button>
                <div className="text-center mt-2">
                    <a
                        href="#!"
                        className="text-gray-700 underline text-xs hover:text-amber-500"
                    >
                        Trouble signing in?
                    </a>
                </div>
            </form>
        </>
    );
}
