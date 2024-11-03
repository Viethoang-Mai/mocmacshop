import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import mockDataNav from "../../../utils/MockData/mockDataNav";
import NavSlide from "./components/NavSlide";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../stores/slices/categorySlice";

export default function Header() {
    const [openSlide, setOpenSlide] = useState(false);
    const [searchText, setSearchText] = useState("All");

    const categories = JSON.parse(localStorage.getItem("categories"));

    const handleClick = () => {
        setOpenSlide(!openSlide);
    };
    return (
        <header>
            <div className="container mx-auto bg-[#549ba3] text-[#fff8ed] relative flex py-2  items-center justify-between px-8 md:gap-x-0">
                {/* nav-left */}
                <div className="nav-left flex h-full flex">
                    <Link
                        to="/"
                        className=" text-lg font-bold mr-5 leading-none bg-[#fff8ed] text-center text-black rounded-lg px-1 pb-[3px] hover:text-amber-500 hover:bg-[#fff8edf0] transition-all duration-200 md:text-xs "
                    >
                        <img
                            className=" h-8 bg-white/80 rounded-xl mx-auto"
                            src={logo}
                            alt="mocmacshop"
                        />
                        <h1>MOCMACSHOP</h1>
                    </Link>
                    <div className="nav-location flex items-center border border-white/0 hover:border-amber-500 xxs:hidden  ">
                        <Link to="/">
                            <i className="fa-solid fa-location-dot mr-2 text-xl"></i>
                        </Link>
                        <Link className="flex flex-col  ">
                            <span className="text-xs">Deliver to</span>
                            <span className="font-bold">Hanoi</span>
                        </Link>
                    </div>
                </div>

                <form
                    action=""
                    className="nav-search-bar flex  w-1/2 xl:w-5/12 sm:hidden relative  "
                >
                    <div className="nav-left relative  ">
                        <div className="btn-filter py-1 px-3 md:px-2 bg-gray-300 h-full text-sm text-black flex items-center cursor-pointer rounded-s-md">
                            {searchText}
                            <i className="fa-solid fa-caret-down ml-2"></i>
                        </div>
                        <select
                            onChange={(e) => setSearchText(e.target.value)}
                            className="categories-select mt-1 z-100 absolute text-black outline-none border-0 top-0 left-0 h-full w-full rounded-md opacity-0 font-medium  "
                            name="categories"
                            id="categories"
                            defaultValue={searchText}
                        >
                            {categories?.map((item, index) => (
                                <option
                                    value={item.name}
                                    key={index}
                                    className="bg-gray-50 text-[#68c4cf] font-medium "
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        className=" text-black text-sm font-medium nav-search grow px-2 outline-none border-2  border-white/0 focus:border-amber-700 "
                        type="text"
                        placeholder="Search"
                    />
                    <button className="nav-search-btn px-3 py-1 text-xl bg-amber-500 rounded-e-md">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                {/* nav-right */}
                <div className="nav-right flex  gap-x-7 lg:gap-x-4 items-center ">
                    <div className="nav-right-item language border border-white/0 hover:border-amber-500 ">
                        <button className="font-medium md:hidden">
                            <span className="fi fi-us"></span>
                            EN
                            <i className="fa-solid fa-caret-down text-xs"></i>
                        </button>
                    </div>
                    <Link
                        to=""
                        className="user flex flex-col border border-white/0 hover:border-amber-500  "
                    >
                        <span className="text-xs">Hello</span>
                        <span className="font-semibold text-sm">Sign in</span>
                    </Link>
                    <Link className="favorites flex flex-col border border-white/0 hover:border-amber-500  ">
                        <i className="fa-regular fa-heart text-2xl"></i>
                    </Link>
                    <div className="cart border border-white/0 hover:border-amber-500 ">
                        <Link to="/cart" className="font-medium text-xl">
                            <i className="fa-solid fa-cart-shopping text-xl mr-2"></i>
                            <span className="lg:hidden">Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-[#549ba3] px-8 hidden sm:block pb-2">
                <form
                    action=""
                    className="nav-search-bar flex  rounded-md overflow-hidden  "
                >
                    <div className="nav-left  ">
                        <button className="btn-filter py-1 px-3 md:px-2 bg-gray-300 h-full text-sm text-black ">
                            All
                            <i className="fa-solid fa-caret-down ml-2"></i>
                        </button>
                    </div>
                    <input
                        className=" text-black text-sm font-medium nav-search grow px-2 outline-none border-2  border-white/0 focus:border-amber-700"
                        type="text"
                        placeholder="Search"
                    />
                    <button className="nav-search-btn px-3 py-1 text-xl bg-amber-500">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
            <div className="container nav-main flex items-center px-8 py-2 bg-[#085558] text-[#fff8ed] font-medium text-sm  overflow-x-auto">
                <button className="nav-toggle mr-4" onClick={handleClick}>
                    <i className="fa-solid fa-bars text-xl"></i>
                </button>
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
                <div
                    className={clsx(
                        "nav-slide fixed top-0 left-0 w-1/4 md:w-1/3 xs:w-5/12 xxs:w-6/12 h-screen z-50 bg-white transition-all duration-300 ",
                        openSlide ? " translate-x-0" : " translate-x-[-200%]"
                    )}
                >
                    <NavSlide />
                </div>
                <span
                    onClick={handleClick}
                    className={clsx(
                        "overlay top-0 fixed left-0  h-screen  transition-all duration-200 ",
                        openSlide ? " z-10 bg-[#000c] w-full" : "  z-[-1]"
                    )}
                ></span>
            </div>
        </header>
    );
}
