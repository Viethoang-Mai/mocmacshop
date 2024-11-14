import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function SearchResult({ data }) {
    return (
        <div className="text-black overflow-hidden overflow-y-auto h-full">
            {/* <h2 className="text-sm font-semibold">Top searches this week</h2> */}
            <ul className="list mt-2 flex flex-col gap-2  ">
                {data?.map((item) => (
                    <li className="flex items-center h-10" key={item.id}>
                        <img
                            className="object-cover rounded w-10 h-10 "
                            src={item.image_url}
                            alt={item.name}
                        />
                        <Link
                            className="h-full text-sm text-gray-700 hover:bg-gray-300 grow flex items-center p-2 "
                            to={`/product/${item.id}`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

SearchResult.propTypes = {
    data: PropTypes.array,
};
