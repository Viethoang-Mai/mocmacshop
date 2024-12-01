import React, { useEffect, useRef, useState } from "react";
import dataAmzDeal from "../../../utils/MockData/dataAmzDeal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import clsx from "clsx";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./SwiperAmz.module.css";
import BtnFavoriteDemo from "../../../components/BtnFavoriteDemo";
import formatPrice from "../../../utils/formatPrice";
import { Link } from "react-router-dom";
import ImgSkeleton from "../../../components/Skeleton/ImgSkeleton";
export default function AmzDeal() {
    const [loading, setLoading] = useState(true);
    const handlePrice = (oldPrice, discount) => {
        const newPrice = oldPrice - (oldPrice * discount) / 100;

        return formatPrice(newPrice);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="mt-12  py-8 select-none">
            <div className="swiper-container">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={12}
                    slidesPerView={"auto"}
                    slidesPerGroup={3}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    onSwiper={(swiper) => {
                        Object.assign(swiper.wrapperEl.style, {
                            order: "2",
                        });
                    }}
                    scrollbar={{
                        draggable: true,
                    }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: " 20px",
                    }}
                >
                    <div className="row flex justify-between mb-5 order-1">
                        <h2 className="text-2xl font-semibold mb-5">
                            Amazing deals, updated daily
                        </h2>
                        <div className="navigation flex mr-10 sm:hidden">
                            <button
                                disabled
                                className={clsx(
                                    styles["swiper-button-prev"],
                                    "swiper-button-prev mr-8 "
                                )}
                            ></button>
                            <button
                                className={clsx(
                                    styles["swiper-button-next"],
                                    "swiper-button-next"
                                )}
                            ></button>
                        </div>
                    </div>
                    {dataAmzDeal?.map((item) => {
                        return (
                            <SwiperSlide
                                key={item.id}
                                className="text-center relative order-2 p-1 hover:cursor-pointer before:absolute before:top-1/2 before:left-1/2
                            before:-translate-x-1/2 before:-translate-y-1/2 before:w-[50%] before:h-[50%] before:rounded-2xl before:z-[-1] before:bg-white/30 before:transition-all before:duration-300 hover:before:w-[104%] hover:before:h-[102%] hover:before:shadow-trendItem shrink-0 w-[210px] sm:w-[160px] group 
                           "
                            >
                                {" "}
                                {loading ? (
                                    <ImgSkeleton count={2} />
                                ) : (
                                    <>
                                        <Link to="/demo">
                                            <img
                                                loading="lazy"
                                                src={item.img_url}
                                                alt="trend"
                                                className="rounded-2xl object-cover object-center "
                                            />
                                            <div className="info mt-3 px-1">
                                                <h3 className="text-sm font-medium md:text-xs truncate  ">
                                                    {item.title}
                                                </h3>
                                                <div className="price flex gap-2 justify-start items-center  ">
                                                    <span className="price-current text-green-500 font-bold">
                                                        {handlePrice(
                                                            item.price,
                                                            item.vouchers
                                                        )}
                                                    </span>
                                                    <span className="price-old line-through text-gray-500 font-semibold">
                                                        {`$${item.price}`}
                                                    </span>
                                                    <span className="price-discount text-sm text-gray-500 font-medium">
                                                        {`(${item.vouchers}% off)`}
                                                    </span>
                                                </div>
                                                <div className="vote flex gap-1 justify-start text-xs items-center">
                                                    <span className=" font-medium ">
                                                        {item.rating}
                                                    </span>
                                                    <i className="fa-solid fa-star"></i>
                                                    <span className=" text-gray-600">{`(${item.reviewer})`}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <BtnFavoriteDemo />
                                    </>
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}
