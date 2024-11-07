import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import StarRating from "../../components/RatingStart";

export default function Product({ data }) {
    // const dataProduct = useSelector((state) => state.filters.filterProducts);

    return (
        <section className="product p-10">
            <ul className="list grid grid-cols-4 gap-8">
                {data?.map((item) => (
                    <div key={item.id}>
                        <Link
                            to={`/product/${item.id}`}
                            className="overflow-hidden block"
                        >
                            <img
                                src={item.image_url}
                                alt=""
                                className="h-[300px] w-full object-cover oject-fit rounded shadow-lg hover:scale-110 transition-all duration-200"
                            />
                        </Link>
                        <div className="info my-3">
                            <h3 className=" truncate  font-medium md:text-xs">
                                {item.name}
                            </h3>
                            <p className="desc text-xs truncate line-clamp-2 text-wrap">
                                {item.description}
                            </p>
                            <div className="vote">
                                <StarRating
                                    rating={Number(
                                        parseFloat(item.avgRating).toFixed(2)
                                    )}
                                />
                                <span className="text-xs ml-1">
                                    {`(${item.totalReviews})`}
                                </span>
                            </div>
                            <p className="text-green-500 font-semibold">
                                ${item.price}
                            </p>
                        </div>
                        <div className="action px-3 flex items-center justify-between ">
                            <Link
                                to={""}
                                className="btn py-1 text-xs px-3 border-2 rounded-full border-gray-800 font-medium hover:bg-gray-800 hover:text-white transition-all duration-150"
                            >
                                <i className="fa-solid fa-plus text-xs"></i> Add
                                to cart
                            </Link>
                            <span className="text-xs font-medium">
                                More like this{" "}
                                <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </div>
                    </div>
                ))}
            </ul>
        </section>
    );
}

Product.propTypes = {
    data: PropTypes.array,
};
