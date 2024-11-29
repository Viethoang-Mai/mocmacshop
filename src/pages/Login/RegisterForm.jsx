import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./form.module.css";
import clsx from "clsx";
import { postRegister } from "../../stores/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import emailRegEx from "../../utils/regexEmail";
import { Helmet } from "react-helmet-async";
export default function RegisterForm() {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const { messageRegister, status } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    const registerSchema = Yup.object().shape({
        email: Yup.string()
            .matches(emailRegEx, "Email is not valid")
            .required("Please enter your email"),
        password: Yup.string()
            .min(6, "Password is too short")
            .required("Please enter your password"),
        name: Yup.string()
            .required("Please enter your name")
            .min(1, "Name is too short"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password"),
    });
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });
    const onSubmit = async ({
        email,
        name,
        password,
        confirmPassword: repeat_password,
    }) => {
        setLoading(true);
        setTimeout(() => {
            dispatch(postRegister({ email, name, password, repeat_password }));
            setLoading(false);
            reset();
        }, 400);
    };

    return (
        <>
            <Helmet>
                <title>Register || Mocmacshop</title>
            </Helmet>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                {messageRegister && (
                    <p
                        className={clsx(
                            styles["message"],
                            status === "success" ? "" : styles["error-m"]
                        )}
                    >
                        {status === "success"
                            ? "Registration successful! Please return to the login page to continue"
                            : messageRegister}
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
                            <span>First name</span>
                            <input type="text" {...register("name")} />
                        </label>
                        {errors.name && (
                            <p className={clsx(styles["error"])}>
                                {errors.name.message}
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

                    <div className={clsx(styles["group-input"])}>
                        <label>
                            <span>Confirm password</span>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                            />
                        </label>
                        {errors.confirmPassword && (
                            <p className={clsx(styles["error"])}>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
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
                        "Register"
                    )}
                </button>
            </form>
        </>
    );
}
