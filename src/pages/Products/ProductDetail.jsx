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
// import "swiper/css/free-mode";
import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "./style.css";
// import { FreeMode, Navigation, Thumbs } from "swiper/modules";
export default function ProductDetail() {
    // const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const dispatch = useDispatch();
    const [image, setImage] = useState(0);
    const data = useSelector((state) => state.product.ProductDetail);

    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchProductDetail(id));
    }, []);

    return (
        <section className="product-detail p-10 px-16 xl:px-10 xxs:px-5 ">
            <div className="content flex gap-x-5 p-5  ">
                <div className="content-left p-5 w-8/12 ">
                    <div className="img ">
                        <div className="shadow-xl">
                            <img
                                loading="lazy"
                                src={images[image]}
                                alt=""
                                className="h-[450px] w-full text-center object-cover"
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
                    {data.reviews && (
                        <div className="review mt-10">
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
                </div>
                <div className="content-right w-5/12 ">
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
                    <FormAction />
                    <ItemDetail />
                    <Shipping />
                </div>
            </div>
        </section>
    );
}
