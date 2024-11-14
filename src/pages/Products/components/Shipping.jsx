import React, { useEffect, useState } from "react";
import style from "./info.module.css";
import clsx from "clsx";
export default function Shipping() {
    const [open, setOpen] = useState(false);

    return (
        <div onClick={() => setOpen(!open)} className={style.container}>
            <h5 className={style.title}>
                Shipping and return policies{" "}
                {!open ? (
                    <i className="fa-solid fa-caret-down"></i>
                ) : (
                    <i className="fa-solid fa-caret-up"></i>
                )}
            </h5>
            <div className={clsx(style.list, open && style.active)}>
                <p className={style.item}>
                    {" "}
                    <i className=" text-lg fa-regular fa-calendar"></i>Ships out
                    within 3–7 business days
                </p>
                <p className={style.item}>
                    <i className=" text-lg fa-solid fa-box-archive"></i> Returns
                    & exchanges accepted within 14 days
                </p>
                <p className={style.item}>
                    <i className=" text-lg fa-solid fa-truck-fast"></i>Cost to
                    ship:
                    <span className="font-semibold text-sm"> $30</span>
                </p>
                <p className={style.item}>
                    {" "}
                    <i className=" text-lg fa-solid fa-location-dot"></i>Ships
                    from: United States
                </p>
                <span className="text-xs font-semibold">
                    Deliver to VietNam{" "}
                    <i className="text-sm fa-solid fa-pen"></i>
                </span>
            </div>
        </div>
    );
}
