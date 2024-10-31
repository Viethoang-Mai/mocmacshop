import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
export default function ItemDeal({ data }) {
    const ref = useRef(null);
    const handlePrice = (oldPrice, discount) => {
        const newPrice = oldPrice - (oldPrice * discount) / 100;
        const formatPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(newPrice);

        return formatPrice;
    };
    useEffect(() => {
        console.log(ref.current.scrollWidth, ref.current.clientWidth);
    }, []);

    return (
        <div ref={ref} className="flex gap-x-5 px-4  ">
            {data?.map((item) => {
                return (
                    <div
                        key={item.id}
                        className="text-center relative p-1 hover:cursor-pointer before:absolute before:top-1/2 before:left-1/2
                before:-translate-x-1/2 before:-translate-y-1/2 before:w-[50%] before:h-[50%] before:rounded-2xl before:z-[-1] before:bg-white/30 before:transition-all before:duration-300 hover:before:w-[104%] hover:before:h-[102%] hover:before:shadow-trendItem shrink-0 w-[200px] 
               "
                    >
                        <img
                            src={item.img_url}
                            alt="trend"
                            className="rounded-2xl object-cover object-center "
                        />
                        <div className="info mt-3 px-1">
                            <h3 className="text-sm font-medium md:text-xs truncate  ">
                                {item.title}
                            </h3>
                            <div className="price flex gap-2 justify-start items-center  ">
                                <span className="price-current text-green-500 font-bold">
                                    {handlePrice(item.price, item.vouchers)}
                                </span>
                                <span className="price-old line-through text-gray-500 font-semibold">
                                    {`$${item.price}`}
                                </span>
                                <span className="price-discount text-sm text-gray-500 font-medium">
                                    {`(${item.vouchers}% off)`}
                                </span>
                            </div>
                            <div className="vote flex gap-1 justify-start text-xs items-center">
                                <span className=" font-medium ">
                                    {item.rating}
                                </span>
                                <i className="fa-solid fa-star"></i>
                                <span className=" text-gray-600">{`(${item.reviewer})`}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
ItemDeal.propTypes = {
    data: PropTypes.array,
};
