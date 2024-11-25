import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SelectQuantityItem from "./SelectQuantityItem";
import { removeFromCart } from "../../stores/slices/cartSlice";
import styles from "./Cart.module.css";
import clsx from "clsx";
import Checkout from "./Checkout";
import OptionFee from "./OptionFee";
export default function ListCart() {
    const [fee, setFee] = useState(0);
    const {
        cart: { listCart: cart },
    } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleRemove = ({ product_id }) => {
        dispatch(removeFromCart({ product_id }));
    };
    return (
        <section className="my-10">
            <div className="cart-inner flex gap-10">
                <div className="cart-list border border-gray-300 p-5 rounded-md">
                    <div className="flex flex-col gap-5 pb-5 border-b border-gray-300 ">
                        {cart.map((item) => (
                            <div
                                className="cart-item  flex gap-5"
                                key={item.id}
                            >
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
                                    <span className="text-green-600 text-xs font-medium">
                                        {item.products.stock < 10 && "Only "}{" "}
                                        {item.products.stock} left in stock -
                                        order soon!
                                    </span>
                                    <SelectQuantityItem item={item} />
                                    <div className="action flex gap-5 text-xs font-medium w-fit">
                                        <button>Edit</button>
                                        <button>Save for later</button>
                                        <button
                                            onClick={() =>
                                                handleRemove({
                                                    product_id: item.product_id,
                                                })
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <p className="font-semibold  text-md flex items-center flex-col ">
                                    $
                                    {Number(item.price * item.quantity).toFixed(
                                        2
                                    )}
                                    <span className="text-[11px] text-nowrap font-normal">
                                        (${item.price} each)
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="fee-option flex justify-between items-center w-1/3">
                        <button className="btn font-medium">Shipping: </button>
                        <i className="fa-solid fa-caret-down "></i>
                    </div>
                    {/* <OptionFee /> */}
                </div>
                <Checkout />
            </div>
        </section>
    );
}
