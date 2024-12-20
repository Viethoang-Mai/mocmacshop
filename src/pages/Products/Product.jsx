import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import StarRating from "../../components/RatingStart";
import FavoriteBtn from "../../components/FavoriteBtn";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../stores/slices/cartSlice";
import ImgSkeleton from "../../components/Skeleton/ImgSkeleton";
import Loading from "../../components/Loading/Loading";
import { setShowForm } from "../../stores/slices/authSlice";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

export default function Product() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);
    const {
        filterProducts: { data },
        status,
    } = useSelector((state) => state.filters);

    const { status: statusCart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const handleAddToCart = ({ product_id, quantity, price }) => {
        setLoadingAction(true);
        dispatch(addToCart({ product_id, quantity, price }));
    };
    useEffect(() => {
        setLoading(true);
        if (status === "succeeded") {
            setTimeout(() => {
                setLoading(false);
            }, 600);
        }
    }, [status]);

    useEffect(() => {
        if (statusCart === "success") {
            setTimeout(() => {
                setLoadingAction(false);
            }, 100);
        }
    }, [statusCart]);

    return (
        <>
            {/* <Helmet>
                <title>Mocmacshop - Shop for handmade, vintage, custom</title>
            </Helmet> */}
            <section className="product py-10">
                {loadingAction && <Loading />}
                <ul className="list grid grid-cols-4 gap-8 xl:gap-5 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 ">
                    {loading &&
                        Array.from(Array(12)).map((item, index) => (
                            <ImgSkeleton key={index} count={3} />
                        ))}
                    {!loading &&
                        data?.map((item) => (
                            <div key={item.id} className="relative group  ">
                                <Link
                                    to={`/product/${item.id}`}
                                    className="overflow-hidden block"
                                >
                                    <img
                                        loading="lazy"
                                        src={item.image_url}
                                        alt=""
                                        className="h-[300px] lg:h-[250px]  xs:h-[150px]  w-full object-cover oject-fit rounded shadow-lg hover:scale-110 transition-all duration-300"
                                    />
                                </Link>
                                <div className="info my-3">
                                    <h3 className=" truncate  font-medium md:text-xs">
                                        {item.name}
                                    </h3>
                                    <p className="desc text-xs truncate line-clamp-2 text-wrap">
                                        {item.description}
                                    </p>
                                    <div className="vote">
                                        <StarRating
                                            rating={Number(
                                                parseFloat(
                                                    item.avgRating
                                                ).toFixed(2)
                                            )}
                                        />
                                        <span className="text-xs ml-1">
                                            {`(${item.totalReviews})`}
                                        </span>
                                    </div>
                                    <p className="text-green-500 font-semibold">
                                        ${item.price}
                                    </p>
                                </div>
                                <div className="action px-3 flex items-center justify-between flex-wrap gap-3 ">
                                    <button
                                        onClick={() => {
                                            if (
                                                Object.keys(user).length !== 0
                                            ) {
                                                handleAddToCart({
                                                    product_id: item.id,
                                                    quantity: 1,
                                                    price: item.price,
                                                });
                                            } else {
                                                dispatch(setShowForm(true));
                                            }
                                        }}
                                        className="btn py-1 text-xs px-3 border-2 rounded-full border-gray-800 font-medium hover:bg-gray-800 hover:text-white transition-all duration-150"
                                    >
                                        <i className="fa-solid fa-plus text-xs"></i>{" "}
                                        Add to cart
                                    </button>
                                    <span className="text-xs font-medium">
                                        More like this{" "}
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </span>
                                </div>
                                <FavoriteBtn
                                    isFavorite={item.isFavorite}
                                    product_id={item.id}
                                />
                            </div>
                        ))}
                </ul>
            </section>
        </>
    );
}

Product.propTypes = {
    data: PropTypes.array,
};
