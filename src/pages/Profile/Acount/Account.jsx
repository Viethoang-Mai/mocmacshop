import React, { useState, useRef } from "react";
import styles from "./Account.module.css";
import clsx from "clsx";
import FormChangePassword from "./FormChangePassword";
import FormChangeEmail from "./FormChangeEmail";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../../../stores/slices/userSlice";
import { Helmet } from "react-helmet-async";
export default function Account() {
    const dispatch = useDispatch();
    const inputNameRef = useRef();
    const { user, status } = useSelector((state) => state.user);
    const [name, setName] = useState(user.name);
    const [editName, setEditName] = useState(false);
    const [err, setErr] = useState(null);
    const handleClick = () => {
        setEditName(!editName);
        inputNameRef.current.focus();
        if (editName) {
            setName(user.name);
        }
    };
    const handleSubmitName = (e) => {
        e.preventDefault();
        const { value } = e.target.name;
        if (value.trim().length < 3) {
            setErr("Name must be at least 3 characters");
        } else if (value.trim() === user.name) {
            setErr("Name must be different");
        } else {
            setErr(null);
            setEditName(false);

            dispatch(changeName(value));
        }
    };
    return (
        <>
            <Helmet>
                <title>Mocmacshop - Account Settings</title>
            </Helmet>
            <section className="flex flex-col gap-y-5 mt-5">
                <form
                    onSubmit={handleSubmitName}
                    action=""
                    className={clsx(styles["form"])}
                >
                    <h4 className={clsx(styles["heading"])}>About you</h4>

                    <div className="flex flex-col ">
                        <label htmlFor="">Name</label>
                        <div className="relative">
                            <input
                                ref={inputNameRef}
                                readOnly={!editName}
                                type="text"
                                value={name}
                                name="name"
                                required
                                className={clsx(
                                    editName
                                        ? "focus:border-blue-500 border"
                                        : "border border-white/0"
                                )}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span
                                onClick={handleClick}
                                className="cursor-pointer text-xs font-medium border border-gray-500 px-2 py-0.5 rounded-full edit absolute top-[50%] translate-y-[-50%] xxs:left-full xxs:translate-x-[-70%] xxs:px-1 left-[210px]"
                            >
                                {editName ? "Cancel" : "Edit"}
                            </span>
                        </div>
                    </div>
                    {err && (
                        <p className="text-red-500 text-xs mt-1 font-medium">
                            {err}
                        </p>
                    )}
                    <button disabled={status === "loading"}>Save</button>
                </form>
                <div className="relative flex flex-col gap-y-5">
                    {user.bio && (
                        <p className="text-sm mt-1 font-medium relative z-10 text-red-600">
                            Sorry, you cannot change your password or email
                            address when logging in through Google. Please use a
                            different login method to make these changes
                        </p>
                    )}
                    <FormChangePassword />
                    <FormChangeEmail />
                    <span
                        className={clsx(
                            "absolute inset-0 z-1 bg-white/50",
                            !user.bio && "hidden"
                        )}
                    ></span>
                </div>
                <button className="w-fit text-red-400 font-semibold text-sm text-left hover:underline hover:text-red-600 transition-all duration-200">
                    Delete Account
                </button>
            </section>
        </>
    );
}
