import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./form.module.css";
import clsx from "clsx";
export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(registerSchema),
    });
    const password = watch("password");
    const onSubmit = async ({ email, password }) => {
        console.log(email, password);
    };

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
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
            <button className={clsx(styles["btn-form"])}>Register</button>
        </form>
    );
}
