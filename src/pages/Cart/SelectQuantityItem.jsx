import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { updateCart } from "../../stores/slices/cartSlice";
export default function SelectQuantityItem({ item }) {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(null);
    const handleUpdateQuantity = (e) => {
        setQuantity(e.target.value),
            dispatch(
                updateCart({
                    product_id: item.product_id,
                    quantity: e.target.value,
                })
            );
    };
    return (
        <select
            name="quantity"
            id=""
            value={quantity || item.quantity}
            onChange={handleUpdateQuantity}
            className="my-2 px-2 py-1 block border border-gray-500 rounded-md focus:outline focus:outline-offset-2 focus:outline-blue-500 text-sm font-medium cursor-pointer"
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
    );
}

SelectQuantityItem.propTypes = {
    item: PropTypes.object,
};
