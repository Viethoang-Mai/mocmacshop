import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setShowForm } from "../../../stores/slices/authSlice";
import { addToCart } from "../../../stores/slices/cartSlice";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
export default function FormAction({ product_id, price }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const { status } = useSelector((state) => state.cart);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        data.product_id = product_id;
        data.price = price;

        delete data.color;

        if (user) {
            dispatch(addToCart(data));
        } else {
            dispatch(setShowForm(true));
        }
        reset();
    };
    useEffect(() => {
        if (status === "loading") {
            setLoading(true);
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, [status]);
    return (
        <div>
            {loading && <Loading />}
            <form
                action=""
                className="flex flex-col gap-2 my-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label
                    htmlFor="color"
                    className=" flex items-center gap-1 mt-2 text-xs font-medium"
                >
                    Colors{" "}
                    <i className="text-[7px] text-red-700 fa-solid fa-star"></i>
                </label>
                <select
                    id="color"
                    className="text-sm font-medium color-options px-2 py-3 outline-none border rounded border-black hover:shadow-lg transition-all duration-200 focus:outline-blue-500"
                    {...register("color", {
                        required: true,
                    })}
                >
                    <option value="">Select an option</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="gray">Gray</option>
                </select>
                {errors.color && (
                    <span className="text-xs font-medium text-red-700">
                        This field is required
                    </span>
                )}
                <label
                    htmlFor="color"
                    className=" flex items-center gap-1 mt-2 text-xs font-medium"
                >
                    Quantity{" "}
                    <i className="text-[7px] text-red-700 fa-solid fa-star"></i>
                </label>
                <select
                    id="amount"
                    className="text-sm font-medium color-options px-2 py-3 outline-none border rounded border-black hover:shadow-lg transition-all duration-200 focus:outline-blue-500"
                    {...register("quantity", {
                        required: true,
                    })}
                >
                    {Array.from(Array(1000)).map((_, i) => (
                        <>
                            <option value={i + 1}>{i + 1}</option>
                        </>
                    ))}
                </select>
                <button
                    disabled={loading}
                    type="submit"
                    className=" mt-5 btn p-3 bg-[#222222] text-white font-medium rounded-full hover:bg-black transition-all duration-200 hover:scale-105 "
                >
                    {" "}
                    {loading ? (
                        <i className="fa-solid fa-spinner animate-spin"></i>
                    ) : (
                        "Add to Cart"
                    )}
                </button>
            </form>
        </div>
    );
}
FormAction.prototype = {
    product_id: PropTypes.number.isRequired,
    price: PropTypes.number,
};
