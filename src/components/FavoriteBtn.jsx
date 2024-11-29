import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../stores/slices/favoriteSlice";
import Loading from "./Loading/Loading";

export default function FavoriteBtn({ isFavorite, product_id }) {
    const [loading, setLoading] = useState(false);
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { statusAction } = useSelector((state) => state.favorite);
    const [active, setActive] = useState(isFavorite);

    const handleClick = () => {
        if (active) {
            setLoading(true);
            dispatch(removeFavorite(product_id));
            setActive(false);
        } else {
            setLoading(true);

            dispatch(addFavorite(product_id));
            setActive(true);
        }
    };

    useEffect(() => {
        if (statusAction === "succeeded") {
            setLoading(false);
        }
    }, [statusAction]);
    if (!accessToken) {
        return null;
    }
    return (
        <>
            {loading && <Loading />}
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
        </>
    );
}

FavoriteBtn.propTypes = {
    isFavorite: PropTypes.bool,
    product_id: PropTypes.number,
};
