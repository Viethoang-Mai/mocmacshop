import React from "react";
import { Link } from "react-router-dom";
import StarRating from "../../components/RatingStart";
import PropTypes from "prop-types";
import FavoriteBtn from "../../components/FavoriteBtn";
import { login } from "../../stores/slices/authSlice";
export default function ListFavorites({ listProduct: data }) {
    return (
        <section className="product py-10">
            <div className="flex flex-wrap items-center justify-between py-5">
                <h4 className="text-lg font-semibold mb-5">All Items</h4>
                <div className="filter ">
                    <form action="" className=" flex items-center ">
                        <input
                            type="text"
                            className="peer text-xs font-medium h-[35px] rounded-l-full border border-gray-500 outline-none px-3 w-[200px] py-1 border-r-0 focus:outline-blue-500 "
                            placeholder="Search your favorite"
                        />
                        <button className=" peer-focus:bg-gray-600 transition-all duration-200 peer-focus:text-white py-1 px-2 h-[35px] rounded-r-full border border-gray-500 border-l-0">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </div>
            <ul className="list grid grid-cols-4 gap-8 xl:gap-5 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 ">
                {data?.map(({ product }) => (
                    <div key={product.id} className="relative group  ">
                        <Link
                            to={`/product/${product.id}`}
                            className="overflow-hidden block"
                        >
                            <img
                                src={product.image_url}
                                alt=""
                                className="h-[300px] lg:h-[250px]  xs:h-[150px]  w-full object-cover oject-fit rounded shadow-lg hover:scale-110 transition-all duration-300"
                            />
                        </Link>
                        <div className="info my-3">
                            <h3 className=" truncate  font-medium md:text-xs">
                                {product.name}
                            </h3>
                            <p className="desc text-xs truncate line-clamp-2 text-wrap">
                                {product.description}
                            </p>
                            <div className="vote">
                                <StarRating
                                    rating={Number(
                                        parseFloat(product.avgRating).toFixed(2)
                                    )}
                                />
                                <span className="text-xs ml-1">
                                    {`(${product.totalReviews})`}
                                </span>
                            </div>
                            <p className="text-green-500 font-semibold">
                                ${product.price}
                            </p>
                        </div>
                        <div className="action px-3 flex items-center justify-between flex-wrap gap-3 ">
                            <Link
                                to={""}
                                className="btn py-1 text-xs px-3 border-2 rounded-full border-gray-800 font-medium hover:bg-gray-800 hover:text-white transition-all duration-150"
                            >
                                <i className="fa-solid fa-plus text-xs"></i> Add
                                to cart
                            </Link>
                            <span className="text-xs font-medium">
                                More like this{" "}
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </div>
                        <FavoriteBtn
                            isFavorite={product.isFavorite}
                            product_id={product.id}
                        />
                    </div>
                ))}
            </ul>
        </section>
    );
}

ListFavorites.propTypes = {
    listProduct: PropTypes.array,
};
