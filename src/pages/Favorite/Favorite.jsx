import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setShowForm } from "../../stores/slices/authSlice";
import ListFavorites from "./ListFavorites";
import { useEffect, useState } from "react";
import { getFavorite } from "../../stores/slices/favoriteSlice";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

export default function Favorite() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const { accessToken } = useSelector((state) => state.auth);
    const { favorite, status } = useSelector((state) => state.favorite);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (accessToken) {
            setLoading(true);
            dispatch(getFavorite());
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [accessToken]);

    return (
        <>
            <Helmet>
                <title>
                    {user?.name
                        ? `${user.name} - Mocmacshop`
                        : "Favorite items - Mocmacshop"}
                </title>
            </Helmet>

            <section className="py-10 px-16 xl:px-10 xxs:px-5 text-gray-800 relative ">
                {loading && <Loading />}
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

                {(status === "idle" && favorite.length === 0) ||
                (status === "succeeded" && favorite.length === 0) ? (
                    <div className="text-center py-10">
                        <div className="icon w-[150px] h-[150px] mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <i className="text-[90px] text-gray-600 fa-solid fa-cat"></i>
                        </div>
                        <p className=" font-semibold my-2">
                            Nothing here... yet.
                        </p>
                        <p className="font-medium  w-1/2 mx-auto">
                            These are a few of your favorite things... or they
                            will be, once you favorite something.
                        </p>
                        <Link
                            className="text-sm font-medium px-3 py-1.5 border-2 border-[#f59e0b] rounded-full font-medium hover:bg-[#f59e0b] hover:text-white transition-all duration-150 mt-5 inline-block "
                            to={"/product/search"}
                        >
                            Shopping now
                        </Link>
                    </div>
                ) : (
                    <ListFavorites listProduct={favorite} status={status} />
                )}
            </section>
        </>
    );
}
