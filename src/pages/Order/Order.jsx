import React, { useEffect } from "react";
import { getOrders } from "../../stores/slices/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import ListOrders from "./ListOrders";
import Loading from "../../components/Loading/Loading";

export default function Order() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { listOrders, statusList } = useSelector((state) => state.order);

    useEffect(() => {
        if (!listOrders.length) {
            dispatch(getOrders());
        }
    }, [dispatch, listOrders.length]);
    if (statusList === "loading") {
        return <Loading />;
    }
    return (
        <section className="py-10 px-16 xl:px-10 xxs:px-5">
            <div className="flex items-center gap-x-4 xs:flex-col ">
                <div className="avt w-[60px] h-[60px] rounded-full overflow-hidden rounded-full bg-[#ffe0c3] flex items-center justify-center">
                    <i className="fa-solid fa-shield-cat text-3xl text-green-600"></i>
                </div>
                <div className="info">
                    <h1 className="text-3xl sm:text-2xl font-medium ">
                        {user.name}'s Orders
                    </h1>
                    <div className="row text-xs font-medium flex gap-x-2">
                        <a href="#">about</a>
                        <a href="#">settings</a>
                    </div>
                </div>
            </div>
            {!listOrders.length && statusList === "succeeded" ? (
                <div className="text-center py-10">
                    <div className="icon w-[150px] h-[150px] mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <i className="text-[90px] text-gray-600 fa-solid fa-cat"></i>
                    </div>
                    <p className=" font-semibold my-2">Nothing here... yet.</p>
                    <p className="font-medium  w-1/2 mx-auto">
                        Your cart is empty! Start adding items to your cart and
                        enjoy shopping with us.
                    </p>
                    <Link
                        className="text-sm font-medium px-3 py-1.5 border-2 border-[#f59e0b] rounded-full font-medium hover:bg-[#f59e0b] hover:text-white transition-all duration-150 mt-5 inline-block "
                        to={"/product/search"}
                    >
                        Shopping now
                    </Link>
                </div>
            ) : (
                <Outlet />
            )}
        </section>
    );
}
