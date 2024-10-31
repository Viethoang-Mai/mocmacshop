import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts } from "../../../stores/slices/productSlice";
export default function FeatureCategories({ data: categories }) {
    // const dispatch = useDispatch();
    // const data = useSelector((state) => state.product.categories);
    // console.log(data);

    // useEffect(() => {
    //     dispatch(fetchProducts());
    // }, []);

    return (
        <div className="feature-categories mt-10">
            <h2 className="text-2xl font-semibold">Feature Categories</h2>
            <div className="grid grid-cols-6 mt-5 gap-5 sm:grid-cols-3 sm:gap-5 xxs:grid-cols-2">
                {categories?.map((item) => {
                    return (
                        <Link key={item.id} to={`/category/${item.id}`}>
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className=" h-3/4 w-full object-cover rounded-2xl hover:shadow-trendItem transition-all duration-100"
                            />
                            <h3 className="text-sm mt-3 font-semibold md:text-xs">
                                {item.name}
                            </h3>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
FeatureCategories.propTypes = {
    data: PropTypes.array,
};
