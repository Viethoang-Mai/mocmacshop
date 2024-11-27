import React, { useState } from "react";
import clsx from "clsx";
import styles from "../../Cart/Cart.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrent } from "../../../stores/slices/checkoutStepSlice";
import { Helmet } from "react-helmet";
export default function Payment() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { payment_method } = JSON.parse(sessionStorage.getItem("checkout"));
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            dispatch(setCurrent("review"));
            navigate("/checkout/review");
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            <Helmet>
                <title>Mocmacshop - Checkout- Payment</title>
            </Helmet>
            <section className="py-10 w-2/3 sm:w-10/12 xxs:w-full mx-auto">
                <div className="header">
                    <h1 className="text-3xl font-medium">
                        Choose a payment method
                    </h1>
                    <p className="text-sm mt-2 text-gray-600">
                        You will not be charged until you review this order on
                        the next page.
                    </p>
                </div>
                <div className="payment">
                    <ul className="flex flex-col gap-3 mt-3">
                        <li
                            className={clsx(styles["group-item"], {
                                hidden: payment_method !== "bank_transfer",
                            })}
                        >
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    name="payment_method"
                                    type="radio"
                                    checked={payment_method === "bank_transfer"}
                                    value="bank_transfer"
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
                        <li
                            className={clsx(styles["group-item"], {
                                hidden: payment_method !== "paypal",
                            })}
                        >
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    name="payment_method"
                                    type="radio"
                                    value="paypal"
                                    checked={payment_method === "paypal"}
                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-slate-400 checked:border-slate-500 transition-all"
                                />
                                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <div className={clsx(styles["list-icon"])}>
                                <i className="fa-brands fa-cc-paypal"></i>
                            </div>
                        </li>
                        <li
                            className={clsx(styles["group-item"], {
                                hidden: payment_method !== "credit_card",
                            })}
                        >
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    name="payment_method"
                                    type="radio"
                                    value="credit_card"
                                    checked={payment_method === "credit_card"}
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
                <button
                    disabled={loading}
                    onClick={handleSubmit}
                    className={clsx(styles["btn"], "mt-5")}
                >
                    {loading ? (
                        <i className="fa-solid fa-spinner animate-spin"></i>
                    ) : (
                        "Continue to review"
                    )}
                </button>
            </section>
        </>
    );
}
