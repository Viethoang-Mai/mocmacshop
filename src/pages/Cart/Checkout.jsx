import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Cart.module.css";
import clsx from "clsx";
import BtnCheckout from "./BtnCheckout";
import { Link } from "react-router-dom";

export default function Checkout() {
    const {
        cart: { total: totalPrice, listCart: cart },
    } = useSelector((state) => state.cart);
    const [fee, setFee] = React.useState(0);
    return (
        <div className="checkout">
            <form action="">
                <h4 className="text-sm font-medium">How you'll pay </h4>
                <div className="payment">
                    <ul className="flex flex-col gap-3 mt-3">
                        <li className={clsx(styles["group-item"])}>
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    name="payment"
                                    type="radio"
                                    defaultChecked={true}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-slate-400 checked:border-slate-500 transition-all"
                                />
                                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <div className={clsx(styles["list-icon"])}>
                                <i className="fa-brands fa-cc-visa"></i>
                                <i className="fa-brands fa-cc-mastercard"></i>
                                <i className="fa-brands fa-cc-jcb"></i>
                                <i className="fa-brands fa-cc-diners-club"></i>
                            </div>
                        </li>
                        <li className={clsx(styles["group-item"])}>
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    name="payment"
                                    type="radio"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-slate-400 checked:border-slate-500 transition-all"
                                />
                                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <div className={clsx(styles["list-icon"])}>
                                <i className="fa-brands fa-cc-paypal"></i>
                            </div>
                        </li>
                        <li className={clsx(styles["group-item"])}>
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    name="payment"
                                    type="radio"
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-slate-400 checked:border-slate-500 transition-all"
                                />
                                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <div className={clsx(styles["list-icon"])}>
                                <i className="fa-regular fa-credit-card"></i>
                            </div>
                        </li>
                    </ul>
                </div>
                <p className="text-sm my-3 flex justify-between">
                    Item(s) total:{" "}
                    <span className="font-medium">
                        ${totalPrice.toFixed(2)}
                    </span>
                </p>
                <div className="shipping flex justify-between text-sm pb-5 border-b border-gray-400">
                    <p className="relative">
                        Shipping{" "}
                        <span className="text-gray-500 text-xs absolute bottom-0 right-1/2 text-nowrap translate-y-full translate-x-1/2">
                            (to Vietnam)
                        </span>
                    </p>
                    <span className="font-medium text-green-600">
                        {cart.length >= 2 ? "FREE" : "$30"}
                    </span>{" "}
                </div>
                <p className="text-sm my-3 flex justify-between font-medium">
                    Total ({cart.length} item{cart.length > 1 ? "s" : ""}){" "}
                    <span>${(totalPrice + 30).toFixed(2)}</span>
                </p>
                <Link to={"/checkout/shipping"} className={clsx(styles["btn"])}>
                    Process to checkout
                </Link>
            </form>
        </div>
    );
}
