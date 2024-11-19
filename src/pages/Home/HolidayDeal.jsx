import { Link } from "react-router-dom";
import BtnFavoriteDemo from "../../components/BtnFavoriteDemo";

export const images = [
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1730387519/hld-5_rennql.jpg",
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1730387520/hld-4_jtwgfj.jpg",
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1730387519/hld-2_ailxeu.webp",
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1730387519/hld-1_wl6fno.jpg",
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1730387519/hld-3_ijbmlz.avif",
    "https://res.cloudinary.com/dszxqzf9t/image/upload/v1730388213/hld-6_tk80hx.webp",
];
export default function HolidayDeal() {
    return (
        <div className="holiday-deal grid grid-cols-4 lg:grid-cols-3 py-8 md:grid-cols-2 gap-6 lg:gap-4  justify-center items-center ">
            <div className="content col-span-2 pl-10 ">
                <span className="text-amber-600 ">Editors’ Picks</span>
                <h2 className="text-2xl font-semibold my-2">Holiday Deals</h2>
                <p className="max-w-[60%] lg:max-w-[70%] xxs:hidden">
                    Get into the spirit with up to 40% off holiday savings!
                </p>
                <button className=" mt-7 bg-amber-400 font-semibold text-gray-600 px-4 py-2 rounded-full hover:bg-amber-500 hover:shadow transition-all duration-150 xxs:hidden">
                    Shop these unique finds
                </button>
            </div>
            {images.map((image, index) => (
                <div
                    className="image relative group overflow-hidden rounded-2xl w-full h-full"
                    key={index}
                >
                    <Link to="/demo">
                        <img
                            src={image}
                            alt="holiday-deal"
                            className="  w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-300"
                        />
                        <span className="price z-[-1] absolute  bottom-3 left-5 text-black py-1 px-3 bg-white rounded-full font-semibold group-hover:z-[0] transition-all duration-300">
                            {" "}
                            $40.00{" "}
                            <span className="text-xs line-through ml-1 font-medium text-gray-500">
                                $50.18
                            </span>
                        </span>
                    </Link>
                    <BtnFavoriteDemo />
                </div>
            ))}
        </div>
    );
}
