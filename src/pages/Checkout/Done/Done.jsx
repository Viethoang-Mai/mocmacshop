import { Link } from "react-router-dom";
export default function Done() {
    return (
        <section className="w-2/3 mx-auto sm:w-full py-5 text-center">
            <h1 className="text-2xl font-medium">
                Your order has been placed!{" "}
            </h1>
            <div className="heading text-center pt-20 md:pt-10 ">
                <div className="icon">
                    <i className="text-6xl text-green-600 fa-regular fa-circle-check"></i>
                </div>
                <h2 className=" font-medium mt-5 text-gray-700">
                    Order placed successfully! Thank you for shopping with us.
                    We appreciate your purchase and will process it shortly.
                </h2>
            </div>
            <div className="action flex gap-5 mt-5 justify-center items-center text-sm font-medium flex-wrap">
                <Link
                    to={"/"}
                    className="rounded min-w-40  px-3 py-1.5 border-2 border-[#f59e0b4a] bg-[#f59e0b4a] hover:bg-[#f59e0b]"
                >
                    Continue Shopping
                </Link>
                <Link
                    to={"/orders"}
                    className="rounded min-w-40  px-3 py-1.5 border-2 border-[#f59e0b] bg-[#f59e0b] text-white hover:bg-[#f59e0ba8] hover:text-gray-900 "
                >
                    View Order
                </Link>
            </div>
            <div className="social flex justify-center items-center mt-8 flex-col">
                <h3 className=" font-medium text-lg text-gray-700">
                    Follow us:
                </h3>
                <div className="social flex gap-x-2 text-lg mt-4 text-xl text-gray-800">
                    <i className="fa-brands fa-facebook cursor-pointer hover:scale-110 transition-all duration-200"></i>
                    <i className="fa-brands fa-twitter cursor-pointer hover:scale-110 transition-all duration-200"></i>
                    <i className="fa-brands fa-instagram cursor-pointer hover:scale-110 transition-all duration-200"></i>
                    <i className="fa-brands fa-youtube cursor-pointer hover:scale-110 transition-all duration-200"></i>
                </div>
            </div>
        </section>
    );
}
