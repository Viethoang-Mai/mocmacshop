import React from "react";
import FeatureCategories from "../Home/FeatureCategories";
import { useSelector } from "react-redux";
import ListCart from "./ListCart";
import { Link } from "react-router-dom";

export default function Cart() {
    const {
        cart: { listCart: cart },
    } = useSelector((state) => state.cart);

    return (
        <section className="py-10 px-16 xl:px-10 xxs:px-5 ">
            {cart?.length > 0 && (
                <h1 className="text-2xl font-medium mb-5">Your cart</h1>
            )}
            <div className="flex items-center gap-x-3">
                <i className="fa-regular fa-handshake text-3xl"></i>
                <h4 className="text-sm">
                    <span className="font-bold">Buy confidently</span> with
                    MocMac's Purchase Protection program for buyers, get a full
                    refund in the rare case your item doesn't arrive, arrives
                    damaged, or isn't as described.{" "}
                    <a href="#!" className="underline italic">
                        See eligibility
                    </a>
                </h4>
            </div>
            {!cart?.length ? (
                <>
                    <h1 className="text-2xl text-center my-10">
                        Your cart is empty
                    </h1>
                    <div className="text-center">
                        <Link
                            className="text-sm font-medium px-3 py-1.5 border-2 border-[#f59e0b] rounded-full font-medium hover:bg-[#f59e0b] hover:text-white transition-all duration-150 mt-4 inline-block "
                            to={"/product/search"}
                        >
                            Shopping now
                        </Link>
                    </div>
                </>
            ) : (
                <ListCart />
            )}
            <p className="text-xs font-medium">
                <i className="text-xl fa-solid fa-leaf mr-2 "></i>MocMac offsets
                carbon emissions from every delivery
            </p>
            {/* <FeatureCategories /> */}
        </section>
    );
}
