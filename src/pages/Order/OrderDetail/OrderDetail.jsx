import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../stores/slices/orderSlice";
import { useParams } from "react-router-dom";
import styles from "./OrderDetail.module.css";
import clsx from "clsx";
export default function OrderDetail() {
    const { id } = useParams();
    const { order } = useSelector((state) => state.order);

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getOrder(id));
        }
    }, [id]);

    return (
        <div className="w-10/12 sm:w-11/12 xs:w-full mx-auto">
            <h1 className="text-xl py-5 font-medium">Your Order</h1>
            <div className="cart-inner flex gap-10 md:flex-col justify-center">
                <div
                    className="cart-list border border-gray-300 p-5 rounded-md overflow-y-auto overflow-x-hidden max-h-[450px] xxs:px-2  [&::-webkit-scrollbar]:w-1 
            [&::-webkit-scrollbar-track]:rounded-full 
            [&::-webkit-scrollbar-track]:bg-gray-200
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-500"
                >
                    <div className="flex flex-col gap-5 pb-5 border-b border-gray-300 xs:gap-y-8 ">
                        {order?.orderItems?.map((item) => (
                            <div
                                className="cart-item  flex gap-5"
                                key={item.id}
                            >
                                <div className="cart-item__img rounded-md  ">
                                    <img
                                        src={item.product.image_url}
                                        alt=""
                                        className="rounded-md max-w-none w-[189px] h-[150px] sm:w-[150px] sm:h-[110px] xxs:w-[120px] xxs:h-[80px]  object-cover"
                                    />
                                </div>
                                <div className="flex  w-full gap-x-5 xs:flex-col xs:items-start relative xs:pb-5 ">
                                    <div className="cart-item__info overflow-hidden xs:order-2">
                                        <h3 className="text-lg sm:text-sm font-medium xxs:text-xs">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-sm xs:text-xs xxs:hidden text-gray-500  line-clamp-1 ">
                                            {item.product.description}
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
                Total: ${order?.total_price}
            </div>
            <div className="information">
                <form action="" className={styles["shipping-form"]}>
                    <div className={clsx(styles["group-input"])}>
                        <label>Address</label>
                        <div>
                            <input
                                readOnly
                                type="text"
                                value={order?.address}
                            />
                        </div>
                    </div>

                    <div className={clsx(styles["group-input"])}>
                        <label>Phone</label>
                        <div>
                            <input
                                readOnly
                                type="text"
                                value={order?.phone_number}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles["group-input"])}>
                        <label>Payment Status</label>
                        <div>
                            <input
                                type="text"
                                readOnly
                                value={order?.status_payment}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles["group-input"])}>
                        <label>Status Delivery</label>
                        <div>
                            <input
                                readOnly
                                type="text"
                                value={order?.status}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className={clsx(styles["group-input"])}>
                        <label>Note</label>
                        <div>
                            <textarea value={order?.note} readOnly />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
