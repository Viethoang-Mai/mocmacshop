import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function ListOrders() {
    const { listOrders, status } = useSelector((state) => state.order);
    console.log(listOrders);

    return (
        <div
            className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 pb-2 px-2 max-h-[500px] [&::-webkit-scrollbar]:h-2 
                    [&::-webkit-scrollbar-track]:rounded-full 
                    [&::-webkit-scrollbar-track]:bg-gray-200
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-500"
        >
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
                    {listOrders?.map((order) => (
                        <tr
                            key={order.id}
                            className=" font-medium border-b bg-gray-900 border-gray-700 hover:bg-gray-600"
                        >
                            <td className="px-6 py-4">{order.id}</td>
                            <td className="px-6 py-4">${order.total_price}</td>
                            <td className="px-6 py-4">
                                {order.status_payment}
                            </td>
                            <td className="px-6 py-4">{order.status}</td>
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
        </div>
    );
}
