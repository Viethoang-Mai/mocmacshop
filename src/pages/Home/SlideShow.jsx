import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const images = [
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1729845454/slider-1_ahebvh.jpg",
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1729845454/slider-2_ailgxw.jpg",
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1729845457/slider-3_keq8yj.jpg",
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1729845455/slider-4_cbpjdv.jpg",
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1729845454/slider-5_dfwlmh.jpg",
];

export default function SlideShow() {
    return (
        <div className="swiper-container">
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, Autoplay]}
                spaceBetween={5}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                speed={800}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                // pagination={{ clickable: true }}
                loop
                style={{
                    "--swiper-navigation-color": "#f59e0b",
                    "--swiper-navigation-size": "60px",
                    "--swiper-navigation-z-index": "2",

                    height: "fit-content",
                    position: "relative",
                    zIndex: "0",
                }}
            >
                <span className="overlay absolute  w-full h-[55%] bg-gradient-to-b from-transparent from-1% via-custom-blue via-30% to-custom-white to-90% z-[1] bottom-[-5px] mt-[-40%]"></span>
                <button className="swiper-button-prev"></button>
                <button className="swiper-button-next"></button>
                {images.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className=" w-full h-[70vh] md:h-[55vh] sm:h-[50vh] xs:h-[35vh]  "
                    >
                        <img
                            src={image}
                            alt=""
                            loading="lazy"
                            className="oject-center object-cover block "
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
