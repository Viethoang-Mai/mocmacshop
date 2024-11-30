import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import mockDataNav from "../../../utils/MockData/mockDataNav";
import SearchHeader from "./components/SearchHeader";
import { useSelector, useDispatch } from "react-redux";
import { setShowForm } from "../../../stores/slices/authSlice";
import MenuUser from "./components/MenuUser/MenuUser";
import { setHeightHeader } from "../../../stores/slices/effectSlice";
import Overlay from "./components/Overlay";
import clsx from "clsx";
import styles from "./Header.module.css";
function Header() {
    const dispatch = useDispatch();
    const refHeader = useRef(null);
    const refSearch = useRef(null);
    const { user } = useSelector((state) => state.user);
    const {
        cart: { listCart: cart },
    } = useSelector((state) => state.cart);

    useEffect(() => {
        const height =
            refHeader?.current?.offsetHeight + refSearch?.current?.offsetHeight;
        dispatch(setHeightHeader(height));
    }, []);

    return (
        <header>
            <div
                ref={refHeader}
                className="container mx-auto bg-[#549ba3] text-[#fff8ed] relative flex py-2  items-center justify-between px-16 xl:px-10 xxs:px-5 md:gap-x-0"
            >
                <Overlay />
                {/* nav-left */}
                <div className="nav-left flex h-full flex">
                    <a
                        href="/"
                        className=" text-lg font-bold mr-5 leading-none bg-[#fff8ed] text-center text-black rounded-lg px-1 pb-[3px] hover:text-amber-500 hover:bg-[#fff8edf0] transition-all duration-200 md:text-xs "
                    >
                        <img
                            className=" h-8 bg-white/80 rounded-xl mx-auto"
                            src={logo}
                            alt="mocmacshop"
                        />
                        <p>MOCMACSHOP</p>
                    </a>
                    <div className="nav-location flex items-center  xxs:hidden  ">
                        <Link to="/">
                            <i className="fa-solid fa-location-dot mr-2 text-xl"></i>
                        </Link>
                        <Link className="flex flex-col  ">
                            <span className="text-xs">Deliver to</span>
                            <span className="font-bold text-sm">Hanoi</span>
                        </Link>
                    </div>
                </div>

                <div className="nav-search-bar  w-1/2 xl:w-5/12 sm:hidden ">
                    <SearchHeader />
                </div>

                {/* nav-right */}
                <div className="nav-right flex  gap-x-6 lg:gap-x-4  items-center ">
                    <div className="nav-right-item language  ">
                        <button className="font-medium text-sm md:hidden flex items-center gap-x-1">
                            <span className="fi fi-us"></span>
                            EN
                            <i className="fa-solid fa-caret-down text-xs"></i>
                        </button>
                    </div>
                    <div className="user flex flex-col items-center border-2 border-transparent hover:border-[#f9d08a] transition-all duration-150">
                        {!Object.keys(user).length ? (
                            <span
                                onClick={() => dispatch(setShowForm(true))}
                                className="font-semibold text-sm xxs:text-xs cursor-pointer "
                            >
                                Sign in
                            </span>
                        ) : (
                            <MenuUser />
                        )}
                    </div>
                    <Link
                        to={"/favorite"}
                        className={clsx("favorites ", styles["link"])}
                    >
                        <i className=" fa-regular fa-heart text-xl"></i>
                        <span className={clsx(styles["hover-action_btn"])}>
                            Favorites
                        </span>
                    </Link>
                    <div className="cart relative ">
                        {cart?.length > 0 && (
                            <span className="absolute -top-2 w-4 h-4 font-semibold bg-red-500 text-[11px] text-[#fff] -right-3  rounded-full flex items-center justify-center z-10">
                                {cart.length}
                            </span>
                        )}
                        <Link
                            to="/cart"
                            className={clsx(
                                "font-medium text-xl",
                                styles["link"]
                            )}
                        >
                            <i className="fa-solid fa-cart-shopping text-lg "></i>
                            <span className={clsx(styles["hover-action_btn"])}>
                                Cart
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                ref={refSearch}
                className="bg-[#549ba3] xl:px-10 xxs:px-5 hidden sm:block pb-2"
            >
                <SearchHeader />
            </div>
            <div
                className="container nav-main flex items-center px-16 xl:px-10 py-2 bg-[#085558] text-[#fff8ed] font-medium text-sm  overflow-x-auto [&::-webkit-scrollbar]:h-2 
                    [&::-webkit-scrollbar-track]:rounded-full 
                    [&::-webkit-scrollbar-track]:bg-gray-200
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-500"
            >
                <ul className="flex gap-x-5 md:gap-x-3 shrink-0  ">
                    {mockDataNav.map((item) => (
                        <li key={item.id}>
                            <Link
                                className="hover:text-amber-500"
                                to={item.link}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}
export default memo(Header);
