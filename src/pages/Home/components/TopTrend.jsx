import React from "react";
import dataTrend from "../../../utils/MockData/dataTrend";

export default function TopTrend() {
    return (
        <div className="text-center px-16 px-8 md:px-0 sm:px-4 ">
            <h2 className="text-2xl font-semibold ">
                Find your new favorite trend!
            </h2>
            <div className="grid grid-cols-6 mt-5 sm:grid-cols-3 sm:gap-5 xxs:grid-cols-2  ">
                {dataTrend.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="text-center relative p-1 hover:cursor-pointer before:absolute before:top-1/2 before:left-1/2
                            before:-translate-x-1/2 before:-translate-y-1/2 before:w-[50%] before:h-[50%] before:rounded-2xl before:z-[-1] before:bg-white before:transition-all before:duration-300 hover:before:w-[95%] hover:before:h-[100%] hover:before:shadow-trendItem 
                           "
                        >
                            <img
                                src={item.img_src}
                                alt="trend"
                                className=" w-11/12 mx-auto rounded-full p-3"
                            />
                            <h3 className="text-sm font-semibold md:text-xs">
                                {item.title}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
