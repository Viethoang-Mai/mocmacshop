import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function TableSkeleton() {
    return (
        <div className="tab-skeleton flex flex-col h-[400px] w-full">
            <div className="header">
                <Skeleton height={50} width="100%" />
            </div>
            <div className="content flex flex-col ">
                <Skeleton count={7} height={40} width="100%" />
            </div>
        </div>
    );
}
