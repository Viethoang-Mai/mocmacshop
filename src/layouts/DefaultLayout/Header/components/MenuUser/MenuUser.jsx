import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MenuUser.module.css";
import slyleHeader from "../../Header.module.css";
import { Link } from "react-router-dom";
import clsx from "clsx";
import LogoutBtn from "../../../../../components/LogoutBtn";
import { setDropUser } from "../../../../../stores/slices/effectSlice";

export default function MenuUser() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { dropUser } = useSelector((state) => state.effect);
    const handleDropdown = (e) => {
        console.log(123);

        e.stopPropagation();
        dispatch(setDropUser());
    };

    return (
        <div className="font-semibold text-sm xxs:text-xs">
            <div className="relative ">
                <button
                    onClick={handleDropdown}
                    className={clsx("gap-x-1", slyleHeader["link"])}
                >
                    <i className="fa-regular text-xs fa-user w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 bg-gray-500 "></i>
                    {/* <span className="relative z-10">{user.name}</span> */}
                    <span className={slyleHeader["hover-action_btn"]}>
                        Your account
                    </span>
                    <i className="fa-solid fa-caret-down text-xs"></i>
                </button>
                {/* Dropdown user */}
                <div
                    className={clsx(
                        styles["DropdownUser"],
                        dropUser && styles["active"]
                    )}
                >
                    <i className="text-[30px] fa-solid fa-caret-up absolute -top-[15px] text-blue-200 right-4 "></i>
                    <ul className="account text-xs pb-2 text-gray-700 bg-white border border-gray-300 rounded-lg overflow-hidden">
                        <li className="header  text-sm  border-b border-gray-300 bg-blue-200 py-3 ">
                            <Link
                                to={"/profile"}
                                className="flex items-center gap-x-4 py-1 px-4 hover:bg-gray-100 transition-all duration-150 "
                            >
                                <div className="icon-user ">
                                    <i className="fa-regular text-xs fa-user w-7 h-7 flex items-center justify-center rounded-full bg-gray-400 "></i>
                                </div>
                                <div>
                                    <div>
                                        <p className="font-semibold">
                                            {user?.name}
                                        </p>
                                        <p className="text-xs">
                                            View your profile
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li className={clsx(styles["item"])}>
                            <Link to={""}>
                                <i className="fa-solid fa-clipboard-list"></i>{" "}
                                Purchases and reviews
                            </Link>
                        </li>
                        <li
                            className={clsx(
                                styles["item"],
                                "border-b border-gray-300"
                            )}
                        >
                            <Link to={""}>
                                <i className="fa-regular fa-message"></i>
                                Messages
                            </Link>
                        </li>
                        <li className={clsx(styles["item"])}>
                            <Link to={""}>
                                <i className="fa-solid fa-tag"></i>Special
                                offers
                            </Link>
                        </li>
                        <li className={clsx(styles["item"])}>
                            <Link to={""}>
                                <i className="fa-solid fa-clipboard"></i>Mocmac
                                Registry
                            </Link>
                        </li>
                        <li
                            className={clsx(
                                styles["item"],
                                "border-b border-gray-300"
                            )}
                        >
                            <Link to={""}>
                                <i className="fa-solid fa-store"></i>Sell on
                                Mocmac
                            </Link>
                        </li>
                        <li className={clsx(styles["item"])}>
                            <LogoutBtn />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
