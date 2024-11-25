import React, { useState } from "react";
import styles from "../../Cart/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../stores/slices/orderSlice";
export default function Review() {
    const dispatch = useDispatch();
    const { payment_method } = JSON.parse(sessionStorage.getItem("checkout"));
    const shipping = JSON.parse(sessionStorage.getItem("shipping"));
    const [loading, setLoading] = useState(false);
    const {
        cart: { listCart, total },
    } = useSelector((state) => state.cart);
    const handleCheckout = () => {
        // setLoading(true);

        dispatch(
            createOrder({
                payment_method,
                listCart,
                total,
                ...shipping,
            })
        );
    };
    return (
        <div className="w-2/3 mx-auto">
            <h1 className="text-3xl py-5 font-medium">Review your order</h1>
            <div className="cart-list border border-gray-300 p-5 rounded-md ">
                <div
                    className="flex flex-col gap-5 pb-5 border-b border-gray-300 overflow-y-auto h-[450px] pr-2 [&::-webkit-scrollbar]:w-2 
                    [&::-webkit-scrollbar-track]:rounded-full 
                    [&::-webkit-scrollbar-track]:bg-gray-200
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-500"
                >
                    {listCart.map((item) => (
                        <div className="cart-item  flex gap-5" key={item.id}>
                            <div className="cart-item__img rounded-md  ">
                                <img
                                    src={item.products.image_url}
                                    alt=""
                                    className="rounded-md max-w-none w-[189px] h-[150px]  object-cover"
                                />
                            </div>
                            <div className="cart-item__info w-full ">
                                <h3 className="text-lg font-medium">
                                    {item.products.name}
                                </h3>
                                <p className="text-sm text-gray-500 overflow-hidden max-w-sm truncate ">
                                    {item.products.description}
                                </p>

                                <p className="text-sm font-semibold text-green-500">
                                    Quantity: {item.quantity}
                                </p>
                            </div>
                            <p className="font-semibold  text-md flex items-center flex-col ">
                                ${Number(item.price * item.quantity).toFixed(2)}
                                <span className="text-[11px] text-nowrap font-normal">
                                    (${item.price} each)
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-right total text-lg my-5 font-medium text-gray-800">
                    Total: ${total}
                </div>
                <button onClick={handleCheckout} className={styles["btn"]}>
                    Checkout
                </button>
            </div>
        </div>
    );
}
