import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../stores/slices/authSlice";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import Account from "./Acount/Account";
const options = [
    "Account",
    "Security",
    "Private Profile",
    "Privacy",
    "Address",
    "Credit Card",
];
export default function Profile() {
    const { profile } = useSelector((state) => state.auth);
    const { data } = profile;

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        dispatch(getProfile());
        setLoading(false);
    }, []);
    if (loading) {
        return <Loading />;
    }

    return (
        <section className="px-40 py-10 xl:px-30 lg:px-16 sm:px-7 xxs:px-5">
            {profile && (
                <div>
                    <div className="flex items-center gap-x-4 ">
                        <div className="avt w-[60px] h-[60px] rounded-full overflow-hidden rounded-full bg-[#ffe0c3] flex items-center justify-center">
                            <i className="fa-solid fa-shield-cat text-3xl text-green-600"></i>
                        </div>
                        <div className="info">
                            <h1 className="text-3xl font-medium ">
                                {data?.name}'s Account
                            </h1>
                            <div className="row text-xs font-medium flex gap-x-2">
                                <a href="#">about</a>
                                <a href="#">settings</a>
                            </div>
                        </div>
                    </div>
                    <div className="action flex flex-col p-5 mt-5 border border-gray-200 rounded">
                        <ul className="flex justify-between border-b-2 border-gray-300  pb-3 px-5">
                            {options.map((item, index) => (
                                <li
                                    className=" font-semibold hover:underline cursor-pointer"
                                    key={index}
                                >
                                    <Link
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
                            <Account />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
