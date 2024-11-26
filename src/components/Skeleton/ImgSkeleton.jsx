import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";
function ImgSkeleton({ count }) {
    return (
        <div className="img-skeleton flex flex-col">
            <div className="img h-[190px] w-full object-cover overflow-hidden">
                <Skeleton height="100%" width="100%" />
            </div>
            <p className="text flex flex-col gap-y-2">
                <Skeleton count={count} height={20} width="100%" />
            </p>
        </div>
    );
}
export function ImgCircleSkeleton({ count }) {
    return (
        <div className="img-skeleton flex flex-col">
            <div className="img h-full w-full  overflow-hidden">
                <Skeleton circle height="100%" width="100%" />
            </div>
            <p className="text">
                <Skeleton count={count} height="100%" width="100%" />
            </p>
        </div>
    );
}

ImgSkeleton.propTypes = {
    count: PropTypes.number,
};

export default ImgSkeleton;
