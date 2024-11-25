import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setShowForm } from "../../stores/slices/authSlice";
import ListFavorites from "./ListFavorites";
import { useEffect } from "react";
import { getFavorite } from "../../stores/slices/favoriteSlice";

export default function Favorite() {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.auth);
    const { favorite } = useSelector((state) => state.favorite);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (accessToken) {
            dispatch(getFavorite());
        }
    }, [accessToken]);

    return (
        <section className="py-10 px-16 xl:px-10 xxs:px-5 text-gray-800 ">
            <div className="header flex items-center gap-x-4 xs:justify-center">
                {" "}
                {!accessToken ? (
                    <>
                        <h1 className="text-3xl">Favorite items</h1>
                        <button
                            onClick={() => dispatch(setShowForm(true))}
                            className="btn px-3 py-0.5 border-2 border-gray-800  rounded-full font-medium hover:bg-gray-800 hover:text-white transition-all duration-150"
                        >
                            Login
                        </button>
                    </>
                ) : (
                    <div className="flex items-center gap-x-4 xs:flex-col ">
                        <div className="avt w-[60px] h-[60px] rounded-full overflow-hidden rounded-full bg-[#ffe0c3] flex items-center justify-center">
                            <i className="fa-solid fa-shield-cat text-3xl text-green-600"></i>
                        </div>
                        <div className="info">
                            <h1 className="text-3xl font-medium ">
                                {user.name}'s Favorites
                            </h1>
                            <div className="row text-xs font-medium flex gap-x-2">
                                <a href="#">about</a>
                                <a href="#">settings</a>
                            </div>
                        </div>
                    </div>
                )}{" "}
            </div>

            {!favorite.length ? (
                <div className="text-center py-10">
                    <div className="icon w-[150px] h-[150px] mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <i className="text-[90px] text-gray-600 fa-solid fa-cat"></i>
                    </div>
                    <p className=" font-semibold my-2">Nothing here... yet.</p>
                    <p className="font-medium  w-1/2 mx-auto">
                        These are a few of your favorite things... or they will
                        be, once you favorite something.
                    </p>
                </div>
            ) : (
                <ListFavorites listProduct={favorite} />
            )}
        </section>
    );
}
