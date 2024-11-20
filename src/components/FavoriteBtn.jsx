import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../stores/slices/favoriteSlice";
import { toast } from "react-toastify";

export default function FavoriteBtn({ isFavorite, product_id }) {
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [active, setActive] = useState(isFavorite);

    const handleClick = () => {
        if (active) {
            dispatch(removeFavorite(product_id));
            setActive(false);
            toast.success("Remove favorite successfully");
        } else {
            dispatch(addFavorite(product_id));
            setActive(true);
            toast.success("Add favorite successfully");
        }
    };

    if (!accessToken) {
        return null;
    }
    return (
        <button
            onClick={handleClick}
            className="favorite absolute z-[-1] top-[5%] right-[6%] py-1 px-2  bg-white rounded-full border-2 border-gray-200  hover:shadow transition-all  group-hover:z-[1] duration-300 hover:border-red-500 ease-in-out  "
        >
            <i
                className={clsx(
                    "fa-solid fa-heart relative top-[1.2px] ",
                    active && "text-red-500"
                )}
            ></i>
        </button>
    );
}

FavoriteBtn.propTypes = {
    isFavorite: PropTypes.bool,
    product_id: PropTypes.number,
};
