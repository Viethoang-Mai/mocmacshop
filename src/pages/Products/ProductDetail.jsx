import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import formatPrice from "../../utils/formatPrice";
import { fetchProductDetail } from "../../stores/slices/productSlice";
import FormAction from "./components/formAction";
import Shipping from "./components/Shipping";
import ItemDetail from "./components/ItemDetail";
import StarRating from "../../components/RatingStart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { images } from "../Home/HolidayDeal";

import "swiper/css";
import "swiper/css/navigation";
import FavoriteBtn from "../../components/FavoriteBtn";
import Loading from "../../components/Loading/Loading";

export default function ProductDetail() {
    const [loading, setLoading] = useState(true);
    // const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const dispatch = useDispatch();
    const [image, setImage] = useState(0);
    const data = useSelector((state) => state.product.ProductDetail);

    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchProductDetail(id));
    }, []);

    useEffect(() => {
        if (data) {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [data]);

    return (
        <section className="product-detail p-10 px-16 xl:px-10 xxs:px-5 ">
            {loading && <Loading />}
            <div className="content flex gap-x-5 flex-wrap  ">
                <div className="img group relative p-5 w-8/12 md:w-full md:px-0">
                    <FavoriteBtn
                        product_id={data.id}
                        isFavorite={data.isFavorite}
                    />
                    <div className="shadow-xl">
                        <img
                            loading="lazy"
                            src={images[image]}
                            alt=""
                            className="h-[450px] xs:h-[350px] w-full text-center object-cover rounded "
                        />
                    </div>

                    <div className="thumb">
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={10}
                            slidesPerView={"auto"}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                            scrollbar={{
                                draggable: true,
                            }}
                            style={{
                                padding: " 10px",
                            }}
                        >
                            {images?.map((img, index) => {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        className={`w-[150px] h-[80px] ${
                                            index === image
                                                ? "border-4 border-amber-500"
                                                : ""
                                        }`}
                                    >
                                        <img
                                            onClick={() => setImage(index)}
                                            loading="lazy"
                                            src={img}
                                            alt="img"
                                            className={`w-full h-full object-cover object-center cursor-pointer `}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
                <div className="content-right w-[30%] pt-10 md:w-full   ">
                    <p className="text-sm text-red-600 font-semibold">
                        In demand. 9 people bought this in the last 24 hours.
                    </p>
                    <span className=" block text-xl font-semibold text-green-600 my-1">
                        {formatPrice(data.price)}
                    </span>
                    <p className="text-sm">{data.description}</p>
                    <span className="text-xs font-medium">
                        <i className=" text-lg text-blue-400 fa-solid fa-check"></i>
                        {"  "}
                        Returns & exchanges accepted
                    </span>
                    <FormAction product_id={data.id} price={data.price} />
                </div>
                {data.reviews && (
                    <div className="review mt-10 w-8/12 md:w-full md:order-4">
                        <p className="leading-[0]  flex items-center gap-x-3 pb-5 border-b-2 border-gray-300 ">
                            <span className="text-2xl">
                                {data.totalReviews}{" "}
                                <span className="text-lg">reviews</span>
                            </span>{" "}
                            <StarRating
                                rating={Number(
                                    parseFloat(data.avgRating).toFixed(2)
                                )}
                                color="#222222"
                                dimension="17px"
                            />
                        </p>
                        <ul className="list-reviewer">
                            {data?.reviews?.map((item) => (
                                <li
                                    key={item.id}
                                    className="py-4 border-b border-gray-300"
                                >
                                    <StarRating
                                        rating={item.rating}
                                        color="#222222"
                                        dimension="16px"
                                    />
                                    <p className="my-2">{item.content}</p>
                                    <div className="flex items-center gap-x-2">
                                        <i className="fa-regular fa-user py-2 px-2 rounded-full bg-gray-200 "></i>{" "}
                                        <span className="text-sm italic underline">
                                            {item.user.name}
                                        </span>{" "}
                                        <span className="text-xs">
                                            {new Date(
                                                item.user.updated_at
                                            ).toLocaleString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}{" "}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="w-[30%] md:w-full md:order-3">
                    <ItemDetail />
                    <Shipping />
                </div>
            </div>
        </section>
    );
}
