import React, { useState } from "react";
import styles from "../../Cart/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../stores/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import { removeAllCart } from "../../../stores/slices/cartSlice";
import { Helmet } from "react-helmet-async";
import { setCurrent } from "../../../stores/slices/checkoutStepSlice";

export default function Review() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { payment_method } = JSON.parse(sessionStorage.getItem("checkout"));
    const shipping = JSON.parse(sessionStorage.getItem("shipping"));
    const [loading, setLoading] = useState(false);
    const {
        cart: { listCart, total },
    } = useSelector((state) => state.cart);
    const handleCheckout = async () => {
        setLoading(true);
        try {
            const res = await dispatch(
                createOrder({
                    payment_method,
                    listCart,
                    total,
                    ...shipping,
                })
            ).unwrap();
            if (res) {
                setTimeout(() => {
                    setLoading(false);
                    dispatch(setCurrent("done"));
                    navigate("/checkout/done");
                    dispatch(removeAllCart());
                }, 1000);
            } else {
                throw new Error();
            }
        } catch (error) {
            setLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>Mocmacshop - Checkout - Review</title>
            </Helmet>

            <div className="w-10/12 sm:w-11/12 xs:w-full mx-auto">
                {loading && <Loading />}
                <h1 className="text-3xl py-5 font-medium">Review your order</h1>
                <div className="cart-inner flex gap-10 md:flex-col justify-center">
                    <div
                        className="cart-list border border-gray-300 p-5 rounded-md overflow-y-auto overflow-x-hidden max-h-[450px] xxs:px-2  [&::-webkit-scrollbar]:w-1 
                        [&::-webkit-scrollbar-track]:rounded-full 
                        [&::-webkit-scrollbar-track]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-500"
                    >
                        <div className="flex flex-col gap-5 pb-5 border-b border-gray-300 xs:gap-y-8 ">
                            {listCart?.map((item) => (
                                <div
                                    className="cart-item  flex gap-5"
                                    key={item.id}
                                >
                                    <div className="cart-item__img rounded-md  ">
                                        <img
                                            src={item.products.image_url}
                                            alt=""
                                            className="rounded-md max-w-none w-[189px] h-[150px] sm:w-[150px] sm:h-[110px] xxs:w-[100px] xxs:h-[80px]  object-cover"
                                        />
                                    </div>
                                    <div className="flex  w-full gap-x-5 xs:flex-col xs:items-start relative xs:pb-5 ">
                                        <div className="cart-item__info overflow-hidden xs:order-2">
                                            <h3 className="text-lg sm:text-sm font-medium xxs:text-xs">
                                                {item.products.name}
                                            </h3>
                                            <p className="text-sm xs:text-xs xxs:hidden text-gray-500  line-clamp-1 ">
                                                {item.products.description}
                                            </p>
                                            <p className="quantity mt-4 text-green-600 sm:text-sm">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-semibold  text-md flex items-center flex-col ">
                                            $
                                            {Number(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                            <span className="text-[11px] text-nowrap font-normal">
                                                (${item.price} each)
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-right total text-lg my-5 font-medium text-gray-800">
                    Total: ${total}
                </div>
                <button
                    disabled={loading}
                    onClick={handleCheckout}
                    className={styles["btn"]}
                >
                    {loading ? (
                        <i className="fa-solid fa-spinner fa-spin animate-spin"></i>
                    ) : (
                        "Checkout"
                    )}
                </button>
            </div>
        </>
    );
}
