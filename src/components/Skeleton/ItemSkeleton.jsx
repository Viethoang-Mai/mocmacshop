import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";
function ItemSkeleton() {
    return (
        <div className="img-skeleton flex gap-3 items-stretch  w-full">
            <div className=" w-[189px] h-[150px] sm:w-[150px] sm:h-[110px] xxs:w-[120px] xxs:h-[80px] mb-3">
                <Skeleton height="100%" width="100%" />
            </div>
            <p className="text flex flex-col gap-y-2 grow ">
                <Skeleton count={4} height={20} width="100%" />
            </p>
        </div>
    );
}

export default ItemSkeleton;
