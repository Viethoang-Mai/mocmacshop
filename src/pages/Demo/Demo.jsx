import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeatureCategories from "../Home/FeatureCategories";
import { fetchProducts } from "../../stores/slices/productSlice";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
export default function Demo() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.product.categories);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <>
            <Helmet>
                <title>Mocmacshop - Shop for handmade, vintage, custom</title>
            </Helmet>
            <section className="py-10 px-10">
                <div className="text-center w-8/12 md:w-11/12 mx-auto xs:text-left mb-20">
                    <h1 className="text-3xl font-semibold  font-bold">
                        Thank you for visiting!
                    </h1>
                    <p className="mt-5 text-lg font-medium">
                        Oops! This page is currently under construction. We
                        apologize for the inconvenience and appreciate your
                        patience. Please check back soon or visit the
                        <span className="text-amber-500 ">
                            {" "}
                            Feature Categories
                        </span>{" "}
                        page
                    </p>
                    <Link
                        to="/"
                        className="px-4 py-2 font-semibold rounded-full border-2 border-gray-500 text-center mt-5 inline-block  hover:transform hover:scale-105 transition-all duration-150"
                    >
                        Go to Home
                    </Link>
                </div>
                <FeatureCategories data={categories} />
            </section>
        </>
    );
}
