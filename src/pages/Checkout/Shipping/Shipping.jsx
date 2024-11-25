import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import emailRegEx from "../../../utils/regexEmail";
import styles from "./Shipping.module.css";
import formStyles from "../../Login/form.module.css";
import clsx from "clsx";
export default function Shipping() {
    const [city, setCity] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
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
    // getDistrict();

    const schema = Yup.object().shape({
        email: Yup.string()
            .matches(emailRegEx, "Email is not valid")
            .required("Please enter your email"),
        StreetAddress: Yup.string().required("Please enter your address"),
        phone: Yup.string()
            .matches(
                /^(\+84|0)(3|5|7|8|9)\d{8}$/,
                "Please enter a valid phone number"
            )
            .required("Please enter your phone number"),
        postalCode: Yup.string()
            .matches(/^[0-9]{6}$/, "Please enter a valid postal code")
            .required("Please enter your postal code"),
        city: Yup.string().required("Please enter your city"),
        country: Yup.string().required("Please enter your country"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => console.log(data);
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
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            {...register("country")}
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
                        <input type="text" {...register("StreetAddress")} />
                    </div>
                    {errors.StreetAddress && (
                        <span className={formStyles["error"]}>
                            {errors.StreetAddress.message}
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
                            <select name="province" id="">
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
                        <input type="text" {...register("phone")} />
                    </div>
                    {errors.phone && (
                        <span className={formStyles["error"]}>
                            {errors.phone.message}
                        </span>
                    )}
                </div>
                <div className={clsx(styles["group-input"], "grow")}>
                    <label>Note</label>
                    <div>
                        <textarea />
                    </div>
                </div>
                <button className={formStyles["btn-form"]}>
                    Continue to payment
                </button>
            </form>
        </section>
    );
}
