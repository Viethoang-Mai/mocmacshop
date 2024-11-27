import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, login } from "../../stores/slices/authSlice";
// import Loading from "../../components/Loading/Loading";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./Profile.module.css";
import clsx from "clsx";
import { Helmet } from "react-helmet";
const options = [
    "Account",
    "Security",
    "Private Profile",
    "Privacy",
    "Address",
    "Credit Card",
];
export default function Profile() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { profile } = useSelector((state) => state.auth);
    const { pathname } = useLocation();

    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        navigate("/profile/account");
        dispatch(getProfile());
        // setLoading(false);
    }, []);
    const handleActive = (path) => {
        return `/${path}` === pathname ? "active" : "";
    };

    return (
        <>
            <Helmet>
                <title>{user?.name}'s Profile - Mocmacshop</title>
            </Helmet>
            <section className="px-40 py-10 xl:px-30 lg:px-16 sm:px-10 xxs:px-5">
                {profile && (
                    <div>
                        <div className="flex items-center gap-4 xxs:flex-col">
                            <div className="avt w-[60px] h-[60px] rounded-full overflow-hidden rounded-full bg-[#ffe0c3] flex items-center justify-center">
                                <i className="fa-solid fa-shield-cat text-3xl text-green-600"></i>
                            </div>
                            <div className="info">
                                <h1 className="text-3xl font-medium ">
                                    {user?.name}'s Account
                                </h1>
                                <div className="row text-xs font-medium flex gap-x-2">
                                    <a href="#">about</a>
                                    <a href="#">settings</a>
                                </div>
                            </div>
                        </div>
                        <div className="action flex flex-col p-5 mt-5 border border-gray-200 rounded">
                            <ul
                                className="flex gap-x-4 sm:gap-x-2 overflow-y-hidden overflow-x-auto pb-3 px-5  [&::-webkit-scrollbar]:h-1 
                        [&::-webkit-scrollbar-track]:rounded-full 
                        [&::-webkit-scrollbar-track]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-500"
                            >
                                {options.map((item, index) => (
                                    <li className=" shrink-0 pb-2 " key={index}>
                                        <Link
                                            className={
                                                clsx(
                                                    styles[
                                                        `${
                                                            handleActive(
                                                                `profile/${item
                                                                    .toLowerCase()
                                                                    .replace(
                                                                        " ",
                                                                        "-"
                                                                    )}`
                                                            )
                                                                ? "active"
                                                                : "hover-link"
                                                        }`
                                                    ]
                                                ) +
                                                " px-2.5 font-medium xs:text-sm"
                                            }
                                            to={`/profile/${item
                                                .toLowerCase()
                                                .replace(" ", "-")}`}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="sidebar">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
