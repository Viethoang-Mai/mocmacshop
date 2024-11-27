import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";

export default function ListOrders() {
    const [loading, setLoading] = useState(true);

    const { listOrders, statusList } = useSelector((state) => state.order);
    // if (statusList === "loading") {
    //     return <Loading />;
    // }
    useEffect(() => {
        if (statusList === "succeeded") {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [statusList]);

    return (
        <>
            {loading && <Loading />}
            <div
                className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 pb-2 px-2 max-h-[500px] [&::-webkit-scrollbar]:h-2 
                        [&::-webkit-scrollbar-track]:rounded-full 
                        [&::-webkit-scrollbar-track]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-500"
            >
                {loading ? (
                    <TableSkeleton />
                ) : (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase  bg-gray-700 text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status Payment
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOrders?.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className=" font-medium border-b bg-gray-900 border-gray-700 hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        ${order.total_price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.status_payment}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/orders/${order.id}`}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
