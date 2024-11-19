import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setShowForm } from "../../stores/slices/authSlice";

export default function Favorite() {
    const { accessToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    return (
        <section className="py-10 px-16 xl:px-10 xxs:px-5 text-gray-800 ">
            <div className="header flex items-center gap-x-4">
                {" "}
                <h1 className="text-3xl  ">Favorite items</h1>{" "}
                {!accessToken && (
                    <button
                        onClick={() => dispatch(setShowForm(true))}
                        className="btn px-3 py-0.5 border-2 border-gray-800  rounded-full font-medium hover:bg-gray-800 hover:text-white transition-all duration-150"
                    >
                        Login
                    </button>
                )}{" "}
            </div>

            <div className="text-center py-10">
                <div className="icon w-[150px] h-[150px] mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <i className="text-[90px] text-gray-600 fa-solid fa-cat"></i>
                </div>
                <p className=" font-semibold my-2">Nothing here... yet.</p>
                <p className="font-medium  w-1/2 mx-auto">
                    These are a few of your favorite things... or they will be,
                    once you favorite something.
                </p>
            </div>
        </section>
    );
}
