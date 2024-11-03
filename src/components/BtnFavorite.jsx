import { toast } from "react-toastify";

export default function BtnFavorite() {
    const handleClick = () => {
        toast.info(
            "This feature is currently available for Categories only. Stay tuned for updates!",
            {
                autoClose: 2000,
            }
        );
    };
    return (
        <button
            onClick={handleClick}
            className="favorite absolute z-[-1] top-3 right-5 py-1 px-2  bg-white rounded-full border border-gray-200 hover:bg-red-400 hover:shadow transition-all duration-150 group-hover:z-[0] transition-all duration-300"
        >
            <i className="fa-regular fa-heart relative top-[1.2px] "></i>
        </button>
    );
}
