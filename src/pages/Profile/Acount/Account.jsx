import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Account.module.css";
import clsx from "clsx";
import { Form } from "react-router-dom";
import FormChangePassword from "./FormChangePassword";
import FormChangeEmail from "./FormChangeEmail";
export default function Account() {
    const inputNameRef = useRef();
    const { user } = useSelector((state) => state.auth);
    const [name, setName] = useState(user.name);
    const [editName, setEditName] = useState(false);
    const handleClick = () => {
        setEditName(!editName);
        inputNameRef.current.focus();
    };
    return (
        <section className="flex flex-col gap-y-5 mt-5">
            <form action="" className={clsx(styles["form"])}>
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
                            className={clsx(
                                editName
                                    ? "focus:border-blue-500 border"
                                    : "border border-white/0"
                            )}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <span
                            onClick={handleClick}
                            className="cursor-pointer text-xs font-medium border border-gray-500 px-2 py-0.5 rounded-full edit absolute top-[50%] translate-y-[-50%] left-[210px]"
                        >
                            {editName ? "Cancel" : "Edit"}
                        </span>
                    </div>
                </div>
                <button>Save</button>
            </form>
            <FormChangePassword />
            <FormChangeEmail />
            <button className="w-fit text-red-400 font-semibold text-sm text-left hover:underline hover:text-red-600 transition-all duration-200">
                Delete Account
            </button>
        </section>
    );
}
