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
            navigation={true}
            // pagination={{ clickable: true }}
            loop
            style={{
                "--swiper-navigation-color": "#f59e0b",
                "--swiper-pagination-color": "#f59e0b",
                "--swiper-navigation-size": "70px",
                "--swiper-pagination-bullet-size": "10px",
                "--swiper-pagination-bullet-width": "10px",
                "--swiper-pagination-bullet-height": "10px",
                "--swiper-pagination-bullet-inactive-color": "#fff",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-opacity": "1",
                height: "fit-content",
                position: "relative",
            }}
        >
            <span className="overlay absolute w-full h-[55%] bg-gradient-to-b from-transparent from-1% via-custom-blue via-30% to-custom-white to-90% z-[1] bottom-0 mt-[-40%]"></span>
            {images.map((image, index) => (
                <SwiperSlide key={index} className="relative w-full h-[70vh] ">
                    <img
                        src={image}
                        alt=""
                        loading="lazy"
                        className="oject-center object-cover "
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
