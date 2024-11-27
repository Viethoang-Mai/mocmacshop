import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { updateCart } from "../../stores/slices/cartSlice";
import { removeFromCart } from "../../stores/slices/cartSlice";
import debounce from "../../utils/debounce";
import { toast } from "react-toastify";
export default function SelectQuantityItem({ item }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(null);
    const [quantityIp, setQuantityIp] = useState(item.quantity);

    const handleUpdateQuantity = (e) => {
        setQuantity(e.target.value),
            setQuantityIp(e.target.value),
            dispatch(
                updateCart({
                    product_id: item.product_id,
                    quantity: e.target.value,
                })
            );
    };
    const onBlur = (e) => {
        setQuantityIp(e.target.value);
        const stock = item.products.stock;
        if (e.target.value > stock) {
            return toast.error("Some thing went wrong");
        }
        dispatch(
            updateCart({
                product_id: item.product_id,
                quantity: e.target.value,
            })
        );
    };

    return (
        <>
            <select
                name="quantity"
                id=""
                value={quantity || item.quantity}
                onChange={handleUpdateQuantity}
                className="xs:hidden my-2 ml-1 px-2 py-1 block border border-gray-500 rounded-md focus:outline focus:outline-offset-2 focus:outline-blue-500 text-sm font-medium cursor-pointer"
            >
                {Array.from(
                    Array(
                        item.products.stock < 100 ? item.products.stock : 100
                    ).keys()
                ).map((index) => (
                    <option value={index + 1} key={index}>
                        {index + 1}
                    </option>
                ))}
            </select>
            <div className="ml-auto w-fit flex border-2 border-gray-300 rounded-full text-gray-600 hidden xs:flex absolute -bottom-3 right-0">
                <span className="px-2 py-0.5 border-r-2 border-gray-300">
                    {item.quantity == 1 ? (
                        <i
                            onClick={() =>
                                dispatch(
                                    removeFromCart({
                                        product_id: item.product_id,
                                    })
                                )
                            }
                            className="fa-solid fa-trash-can "
                        ></i>
                    ) : (
                        <i
                            className="fa-solid fa-minus"
                            onClick={() =>
                                handleUpdateQuantity({
                                    target: { value: quantityIp - 1 },
                                })
                            }
                        ></i>
                    )}
                </span>
                <input
                    type="text"
                    className=" text-center outline-none border-none text-sm w-10 block "
                    value={quantityIp}
                    onChange={(e) => {
                        setQuantityIp(e.target.value);
                    }}
                    onBlur={debounce(onBlur, 1000)}
                />
                <span className="px-2 py-0.5 border-l-2 border-gray-300">
                    <i
                        className="fa-solid fa-plus "
                        onClick={() =>
                            handleUpdateQuantity({
                                target: { value: quantityIp + 1 },
                            })
                        }
                    ></i>
                </span>
            </div>
        </>
    );
}

SelectQuantityItem.propTypes = {
    item: PropTypes.object,
};
