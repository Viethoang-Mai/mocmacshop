import React, { useEffect, useState } from "react";
import style from "./info.module.css";
import clsx from "clsx";
export default function ItemDetail() {
    const [open, setOpen] = useState(false);

    return (
        <div onClick={() => setOpen(!open)} className={style.container}>
            <h5 className={style.title}>
                Item details{" "}
                {!open ? (
                    <i className="fa-solid fa-caret-down"></i>
                ) : (
                    <i className="fa-solid fa-caret-up"></i>
                )}
            </h5>
            <div className={clsx(style.list, open && style.active)}>
                <p className="font-semibold text-sm">Highlights</p>
                <p className={style.item}>
                    {" "}
                    <i className="fa-solid fa-hand-spock"></i>Made by{" "}
                    <span className="font-semibold text-sm italic text-lg">
                        {" "}
                        MocMac
                    </span>
                </p>
                <p className={style.item}>
                    <i className="fa-solid fa-gears text-lg"></i> Materials:
                    Silver, Yellow gold
                </p>
                <p className={style.item}>
                    <i className="fa-solid fa-file-contract text-lg"></i>Cost to
                    shi: Made to Order
                </p>
                <p className={style.item}>
                    {" "}
                    <i className=" text-lg fa-solid fa-location-dot"></i>
                    Location: Earlobe
                </p>
                <p className={style.item}>
                    {" "}
                    <i className="fa-regular fa-square text-lg"></i>
                    Can be personalized
                </p>
                <p className={style.item}>
                    14K Gold Name Earring, Personalized Earrings, Studs, 14K
                    Gold Studs, Personalized Jewelry for Women, Gifts for Her
                    ***All of our products are made of high quality 14K Solid
                    Gold and 925 Sterling Silver.***
                </p>
            </div>
        </div>
    );
}
