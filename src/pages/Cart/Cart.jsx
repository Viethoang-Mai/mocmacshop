import React from "react";
import FeatureCategories from "../Home/FeatureCategories";

export default function Cart() {
    return (
        <section className="py-10 px-16 xl:px-10 xxs:px-5 ">
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
            <h1 className="text-2xl text-center my-10">Your cart is empty</h1>
            <p className="text-xs font-medium">
                <i className="text-xl fa-solid fa-leaf mr-2 "></i>MocMac offsets
                carbon emissions from every delivery
            </p>
            {/* <FeatureCategories /> */}
        </section>
    );
}
