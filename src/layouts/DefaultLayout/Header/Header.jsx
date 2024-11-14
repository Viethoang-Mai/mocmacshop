import { memo } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png";
import mockDataNav from "../../../utils/MockData/mockDataNav";
import SearchHeader from "./components/SearchHeader";

function Header() {
    return (
        <header>
            <div className="container mx-auto bg-[#549ba3] text-[#fff8ed] relative flex py-2  items-center justify-between px-16 xl:px-10 xxs:px-5 md:gap-x-0">
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
                        <h1>MOCMACSHOP</h1>
                    </a>
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

                <div className="nav-search-bar w-1/2 xl:w-5/12 sm:hidden ">
                    <SearchHeader />
                </div>

                {/* nav-right */}
                <div className="nav-right flex  gap-x-6 lg:gap-x-4  items-center ">
                    <div className="nav-right-item language border border-white/0 hover:border-amber-500 ">
                        <button className="font-medium text-sm md:hidden flex items-center gap-x-1">
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
                        <span className="font-semibold text-sm xxs:text-xs">
                            Sign in
                        </span>
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
            <div className="bg-[#549ba3] xl:px-10 xxs:px-5 hidden sm:block pb-2">
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
