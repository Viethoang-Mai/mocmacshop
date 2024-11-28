import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SelectQuantityItem from "./SelectQuantityItem";
import { removeFromCart } from "../../stores/slices/cartSlice";
import Checkout from "./Checkout";
import Loading from "../../components/Loading/Loading";
import ItemSkeleton from "../../components/Skeleton/ItemSkeleton";
export default function ListCart() {
    const [loading, setLoading] = useState(true);
    const {
        cart: { listCart: cart },
        status,
    } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemove = ({ product_id }) => {
        dispatch(removeFromCart({ product_id }));
    };
    useEffect(() => {
        if (status === "loading") setLoading(true);
    }, [status]);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [loading]);

    return (
        <section className="my-10">
            <div className="cart-inner flex gap-10 md:flex-col justify-center ">
                <div
                    className="cart-list w-8/12 md:w-full border border-gray-300 p-5 rounded-md overflow-y-auto overflow-x-hidden max-h-[450px] xxs:px-2  [&::-webkit-scrollbar]:w-1 
                    [&::-webkit-scrollbar-track]:rounded-full 
                    [&::-webkit-scrollbar-track]:bg-gray-200
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-500"
                >
                    {loading && <Loading />}
                    <div className="flex flex-col gap-5 pb-5 border-b border-gray-300 xs:gap-y-8  ">
                        {cart?.map((item) =>
                            status === "idle" && loading ? (
                                <ItemSkeleton key={item.id} />
                            ) : (
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
                                        <i
                                            className="fa-solid fa-xmark text-sm absolute top-1 right-1 text-gray-500 h-6 w-6 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center hidden xs:flex "
                                            onClick={() =>
                                                handleRemove({
                                                    product_id: item.product_id,
                                                })
                                            }
                                        ></i>

                                        <div className="cart-item__info overflow-hidden xs:order-2">
                                            <h3 className="text-lg sm:text-sm font-medium xxs:text-xs">
                                                {item.products.name}
                                            </h3>
                                            <p className="text-sm xs:text-xs xxs:hidden text-gray-500  line-clamp-1 ">
                                                {item.products.description}
                                            </p>
                                            <span className="text-green-600 text-xs font-medium xxs:text-[10px]">
                                                {item.products.stock < 10 &&
                                                    "Only "}{" "}
                                                {item.products.stock} left in
                                                stock - order soon!
                                            </span>
                                            <SelectQuantityItem item={item} />
                                            <div className="action flex gap-5 text-xs font-medium w-fit xs:hidden">
                                                <button>Edit</button>
                                                <button>Save for later</button>
                                                <button
                                                    onClick={() =>
                                                        handleRemove({
                                                            product_id:
                                                                item.product_id,
                                                        })
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
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
                            )
                        )}
                    </div>

                    {/* <div className="fee-option flex justify-between items-center w-1/3">
                        <button className="btn font-medium">Shipping: </button>
                        <i className="fa-solid fa-caret-down "></i>
                    </div> */}
                    {/* <OptionFee /> */}
                </div>
                <Checkout />
            </div>
        </section>
    );
}
