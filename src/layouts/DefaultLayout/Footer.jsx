import logo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import dataFooter from "../../utils/MockData/dataFooter";
export default function Footer() {
    return (
        <footer>
            <div className="container w-full py-10 px-20 xl:px-10 lg:px-16 md:px-7  bg-[#085558] text-white">
                <div className=" grid  grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xxs:grid-cols-1  gap-10 border-b border-[#fff8ed42] pb-10">
                    <ul>
                        <li className=" flex ">
                            <Link
                                to="/"
                                className=" text-lg font-bold  text-center text-black rounded-lg px-1 pb-[3px] hover:text-amber-500  transition-all duration-200 xs:text-lg "
                            >
                                <img
                                    loading="lazy"
                                    className=" h-12 bg-white/80 rounded-xl mx-auto"
                                    src={logo}
                                    alt="mocmacshop"
                                />
                                <h2 className="text-[#fff8ed]">MOCMACSHOP</h2>
                            </Link>
                        </li>
                        <li className="text-sm">
                            <p>Address: 333 Linh Nam, Hoang Mai, Ha Noi</p>
                            <p className="my-2">
                                Tel:{" "}
                                <Link to="#!" className="italic font-medium">
                                    (+84) 123 456 789
                                </Link>
                            </p>
                            <p>
                                Email:{" "}
                                <Link to="#!" className="italic font-medium">
                                    mocmacshop@example.com
                                </Link>
                            </p>
                        </li>
                    </ul>
                    {dataFooter.map((data) => (
                        <ul key={data.id}>
                            <li>
                                <h2 className="text-lg font-bold mb-3">
                                    {data.title}
                                </h2>
                            </li>
                            {data.items.map((item, index) => (
                                <li key={index} className="mb-2 text-sm">
                                    <Link
                                        to="#!"
                                        className="hover:text-amber-500 transition-all duration-200"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>

                <div className="py-5 text-sm flex items-center justify-center gap-x-5 gap-y-2 xs:flex-wrap ">
                    <h3 className="text-xl font-bold">MOCMACSHOP</h3>

                    <div className="social flex gap-x-2 text-lg">
                        <i className="fa-brands fa-facebook cursor-pointer hover:scale-110 transition-all duration-200"></i>
                        <i className="fa-brands fa-twitter cursor-pointer hover:scale-110 transition-all duration-200"></i>
                        <i className="fa-brands fa-instagram cursor-pointer hover:scale-110 transition-all duration-200"></i>
                        <i className="fa-brands fa-youtube cursor-pointer hover:scale-110 transition-all duration-200"></i>
                    </div>
                    <Link
                        to="#!"
                        className="hover:text-amber-500 transition-all font-medium duration-200"
                    >
                        Contact Us
                    </Link>
                    <Link
                        to="#!"
                        className="hover:text-amber-500 transition-all duration-200 font-medium"
                    >
                        Feed Back
                    </Link>
                </div>
                <div className="text-sm">
                    <p className="text-center">
                        © 2022 mocmacshop. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}
