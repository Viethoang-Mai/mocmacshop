import clsx from "clsx";
import styles from "./Account.module.css";
import formStyle from "../../Login/form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { changeEmail } from "../../../stores/slices/userSlice";
import emailRegEx from "../../../utils/regexEmail";

export default function FormChangeEmail() {
    const dispatch = useDispatch();
    const { status, message } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.user);
    const currentEmail = user?.email.trim();
    const schema = Yup.object().shape({
        email: Yup.string()
            .matches(emailRegEx, "Email is not valid")
            .required("Please enter your new email")
            .test(
                "not-same-as-current",
                "New email cannot be the same as your current email",
                function (value) {
                    return value.trim() !== currentEmail;
                }
            ),
        password: Yup.string()
            .min(6, "Password is too short")
            .required("Please enter your password"),
        confirmEmail: Yup.string()
            .oneOf([Yup.ref("email"), null], "Email must match")
            .required("Please confirm your email"),
    });
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        dispatch(changeEmail(data));
        reset();
    };
    return (
        <form
            action=""
            className={clsx(styles["form"])}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h4 className={clsx(styles["heading"])}>Email</h4>
            {message && (
                <p
                    className={clsx(
                        formStyle["message"],
                        status === "success" ? "" : formStyle["error-m"]
                    )}
                >
                    {message}
                </p>
            )}
            <label htmlFor="">Current Email</label>
            <p className="text-sm mt-1 pb-3 border-b border-gray-300">
                {user.email}
            </p>
            <h4 className={clsx(styles["heading"])}>Change your Email</h4>
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-col  ">
                    <label htmlFor="">New Email</label>
                    <div className={clsx(styles["group-input"])}>
                        <input type="email" {...register("email")} />
                    </div>
                    {errors.email && (
                        <p className={clsx(formStyle["error"])}>
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="">Confirm New Email</label>
                    <div className={clsx(styles["group-input"])}>
                        <input type="email" {...register("confirmEmail")} />
                    </div>
                    {errors.confirmEmail && (
                        <p className={clsx(formStyle["error"])}>
                            {errors.confirmEmail.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col ">
                    <label htmlFor="">Your Mocmac Password</label>
                    <div className={clsx(styles["group-input"])}>
                        <input type="password" {...register("password")} />
                    </div>
                    {errors.password && (
                        <p className={clsx(formStyle["error"])}>
                            {errors.password.message}
                        </p>
                    )}
                </div>
            </div>
            <button disabled={status === "loading"}>Change Email</button>
        </form>
    );
}
