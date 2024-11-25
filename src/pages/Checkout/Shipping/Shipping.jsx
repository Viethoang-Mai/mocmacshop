import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./Shipping.module.css";
import formStyles from "../../Login/form.module.css";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
export default function Shipping() {
    const navigate = useNavigate();
    const [city, setCity] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const getDistrict = async () => {
        const res = await fetch(`https://esgoo.net/api-tinhthanh/1/0.htm`);
        const data = await res.json();

        const district = data.data.map((item) => item.full_name);
        setCity(district);
    };

    useEffect(() => {
        if (selectedCountry) {
            getDistrict();
        }
    }, [selectedCountry]);

    const schema = Yup.object().shape({
        address: Yup.string().required("Please enter your address"),
        phone_number: Yup.string()
            .matches(
                /^(\+84|0)(3|5|7|8|9)\d{8}$/,
                "Please enter a valid phone number"
            )
            .required("Please enter your phone number"),
        postalCode: Yup.string()
            .matches(/^[0-9]{6}$/, "Please enter a valid postal code")
            .required("Please enter your postal code"),
        city: Yup.string().required("Please enter your city"),
        city_selected: Yup.string(),
        country: Yup.string().required("Please enter your country"),
        note: Yup.string(),
    });
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        setLoading(true);
        sessionStorage.setItem("shipping", JSON.stringify(data));
        setTimeout(() => {
            setLoading(false);
            navigate("/checkout/payment");
        }, 1000);
    };
    return (
        <section className="shipping py-10 w-1/2 mx-auto ">
            <h1 className="text-3xl font-medium">
                Enter your shipping address
            </h1>
            <form
                action=""
                className={styles["shipping-form"]}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={clsx(styles["group-input"])}>
                    <label>Country</label>
                    <div>
                        <select
                            id=""
                            {...register("country")}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                            <option value="">Select country</option>
                            <option value="Vietnam">Viet Nam</option>
                        </select>
                    </div>
                    {errors.country && (
                        <span className={formStyles["error"]}>
                            {errors.country.message}
                        </span>
                    )}
                </div>

                <div className={clsx(styles["group-input"])}>
                    <label>Street address</label>
                    <div>
                        <input type="text" {...register("address")} />
                    </div>
                    {errors.address && (
                        <span className={formStyles["error"]}>
                            {errors.address.message}
                        </span>
                    )}
                </div>
                <div className={clsx(styles["group-input"])}>
                    <label>City</label>
                    <div>
                        <input type="text" {...register("city")} />
                    </div>
                    {errors.city && (
                        <span className={formStyles["error"]}>
                            {errors.city.message}
                        </span>
                    )}
                </div>
                <div className="flex gap-x-5 ">
                    <div className={clsx(styles["group-input"], "grow")}>
                        <label>Postal code</label>
                        <div>
                            <input type="text" {...register("postalCode")} />
                        </div>
                        {errors.postalCode && (
                            <span className={formStyles["error"]}>
                                {errors.postalCode.message}
                            </span>
                        )}
                    </div>
                    <div className={clsx(styles["group-input"], "grow")}>
                        <label>
                            Province{" "}
                            <span className="text-xs text-gray-600">
                                (optional)
                            </span>
                        </label>
                        <div>
                            <select {...register("city_selected")}>
                                <option value="">Select province</option>
                                {city.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles["group-input"], "grow")}>
                    <label>Phone</label>
                    <div>
                        <input type="text" {...register("phone_number")} />
                    </div>
                    {errors.phone_number && (
                        <span className={formStyles["error"]}>
                            {errors.phone_number.message}
                        </span>
                    )}
                </div>
                <div className={clsx(styles["group-input"], "grow")}>
                    <label>Note</label>
                    <div>
                        <textarea {...register("note")} />
                    </div>
                </div>
                <button disabled={loading} className={formStyles["btn-form"]}>
                    {loading ? (
                        <i className="fa fa-spinner fa-spin animate-spin"></i>
                    ) : (
                        "Continue to payment"
                    )}
                </button>
            </form>
        </section>
    );
}
