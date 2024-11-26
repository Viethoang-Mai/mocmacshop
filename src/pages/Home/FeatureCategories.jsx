import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ImgSkeleton from "../../components/Skeleton/ImgSkeleton";
import { useSelector } from "react-redux";

export default function FeatureCategories() {
    const { categories, status } = useSelector((state) => state.product);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (status === "success") {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [status]);

    return (
        <div className="feature-categories mt-10">
            <h2 className="text-2xl font-semibold">Feature Categories</h2>
            <div className="grid grid-cols-6 mt-5 gap-5 sm:grid-cols-3 sm:gap-5 xxs:grid-cols-2 h-fit">
                {categories?.map((item) => {
                    return status === "loading" ? (
                        <ImgSkeleton />
                    ) : (
                        <div key={item.id}>
                            <Link to={`/category/${item.id}`}>
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className=" h-3/4 w-full object-cover rounded-2xl hover:shadow-trendItem transition-all duration-100"
                                />
                            </Link>
                            <h3 className="text-sm mt-3 font-semibold md:text-xs">
                                {item.name}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
FeatureCategories.propTypes = {
    data: PropTypes.array,
};
