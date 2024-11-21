import clsx from "clsx";
import styles from "./Account.module.css";
import formStyle from "../../Login/form.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { changePassword } from "../../../stores/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function FormChangePassword() {
    const { status, messageChangePassword } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const schema = Yup.object().shape({
        oldPassword: Yup.string()
            .min(6, "Current password is too short")
            .required("Please enter your current password"),
        password: Yup.string()
            .min(6, "Password is too short")
            .required("Please enter your password")
            .test(
                "not-same-as-current",
                "New password cannot be the same as your current password",
                function (value) {
                    return value !== this.parent.oldPassword;
                }
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        dispatch(changePassword(data));
        reset();
    };

    return (
        <form
            action=""
            className={clsx(styles["form"])}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h4 className={clsx(styles["heading"])}>Password</h4>
            {messageChangePassword && (
                <p
                    className={clsx(
                        formStyle["message"],
                        status === "success" ? "" : formStyle["error-m"]
                    )}
                >
                    {messageChangePassword}
                </p>
            )}
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-col  ">
                    <label htmlFor="">Current Password</label>
                    <div className={clsx(styles["group-input"])}>
                        <input type="password" {...register("oldPassword")} />
                    </div>
                    {errors.oldPassword && (
                        <p className={clsx(formStyle["error"])}>
                            {errors.oldPassword.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="">New Password</label>
                    <div className={clsx(styles["group-input"])}>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className={clsx(
                                `absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xs italic underline`
                            )}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>
                    {errors.password && (
                        <p className={clsx(formStyle["error"])}>
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="">Confirm New Password</label>
                    <div className={clsx(styles["group-input"])}>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("confirmPassword")}
                        />
                    </div>
                    {errors.confirmPassword && (
                        <p className={clsx(formStyle["error"])}>
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
            </div>
            <button disabled={status === "loading"}>Change Password</button>
        </form>
    );
}
