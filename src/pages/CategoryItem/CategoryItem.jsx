import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import StarRating from "../../components/RatingStart";
import Filter from "../../components/Filter";
import ImgSkeleton from "../../components/Skeleton/ImgSkeleton";
import { Helmet } from "react-helmet-async";
export default function CategoryItem() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const productData = JSON.parse(sessionStorage.getItem("products"));

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    {" "}
                    {
                        productData.data[
                            productData.data.findIndex((item) => item.id == id)
                        ].name
                    }{" "}
                    - Mocmacshop
                </title>
            </Helmet>
            <section className="category-item p-10 px-16 xl:px-10  xxs:px-5 ">
                <div>
                    <h1 className="text-3xl font-bold text-amber-700">
                        {" "}
                        {
                            productData?.data[
                                productData.data.findIndex(
                                    (item) => item.id == id
                                )
                            ].name
                        }
                    </h1>
                    <p className=" font-medium mt-3">Mocmac's Picks: </p>

                    <Swiper
                        slidesPerView={"auto"}
                        spaceBetween={30}
                        scrollbar={{ draggable: true }}
                        style={{
                            padding: "16px 0",
                        }}
                    >
                        {productData.data[
                            productData.data.findIndex((item) => item.id == id)
                        ].products.map((item) => (
                            <SwiperSlide key={item.id} className="w-[200px]">
                                {loading ? (
                                    <ImgSkeleton count={3} />
                                ) : (
                                    <Link
                                        to={`/product/${item.id}`}
                                        className="block h-full "
                                    >
                                        <img
                                            loading="lazy"
                                            src={item.image_url}
                                            alt={item.name}
                                            className="object-cover object-center rounded  transition-all h-[200px] w-full "
                                        />
                                        <div className="info">
                                            <h3 className=" truncate mt-3 font-medium md:text-xs">
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
                                    </Link>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="mt-10">
                    <Filter />
                </div>
            </section>
        </>
    );
}
