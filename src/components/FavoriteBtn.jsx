import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

export default function FavoriteBtn({ isFavorite }) {
    console.log(isFavorite);

    const handleClick = () => {};
    return (
        <button
            onClick={handleClick}
            className="favorite absolute z-[-1] top-3 right-5 py-1 px-2  bg-white rounded-full border border-gray-200  hover:shadow transition-all duration-150 group-hover:z-[1] transition-all duration-300"
        >
            <i
                className={clsx(
                    "fa-solid fa-heart relative top-[1.2px] ",
                    isFavorite && "text-red-500"
                )}
            ></i>
        </button>
    );
}

FavoriteBtn.propTypes = {
    isFavorite: PropTypes.bool,
};
