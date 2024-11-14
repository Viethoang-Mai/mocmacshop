import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./form.module.css";
import clsx from "clsx";
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
            email: "viethoangmai@gmail.com",
            password: "123456abcd",
        },
    });
    const onSubmit = async ({ email, password }) => {
        console.log(email, password);
    };

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)} className="mb-3">
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
                                onClick={() => setShowPassword(!showPassword)}
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
            <button className={clsx(styles["btn-form"])}>Login</button>
            <div className="text-center mt-3">
                <a
                    href="#!"
                    className="text-gray-700 underline text-xs hover:text-amber-500"
                >
                    Trouble signing in?
                </a>
            </div>
        </form>
    );
}
