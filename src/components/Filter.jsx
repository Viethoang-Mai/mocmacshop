import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterProducts } from "../stores/slices/filterProductSlice";
import Product from "../pages/Products/Product";
import ReactPaginate from "react-paginate";
import { setFilters } from "../stores/slices/filterProductSlice";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import validFilters from "../utils/validFilters";
import FilterFormNav from "./FilterFormNav";
import { useCallback } from "react";
import { Helmet } from "react-helmet-async";

export default function Filter() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const categories = JSON.parse(localStorage.getItem("categories"));

    const dataProduct = useSelector((state) => state.filters.filterProducts);

    const filters = useSelector((state) => state.filters.filters);
    const [activeToggle, setActiveToggle] = useState(false);
    const [openSlide, setOpenSlide] = useState(false);

    // const [filterProducts, setFilterProducts] = useState(filters);
    const [currentPage, setCurrentPage] = useState(0);
    const handleClick = useCallback(() => {
        setOpenSlide(!openSlide);
    }, [openSlide]);

    const handlePageClick = (data) => {
        const selectedPage = data.selected;

        setCurrentPage(selectedPage);
        dispatch(setFilters({ ...filters, _page: selectedPage + 1 }));
        const validData = validFilters(filters);
        const searchParam = new URLSearchParams({
            ...validData,
            _page: selectedPage + 1,
        });
        navigate(`/product/search?${searchParam}`);
    };
    const handleChangeFilter = useCallback(
        (e, minP = null, maxP = null) => {
            e.preventDefault();
            const { name, value } = e.target;

            let updatedFilters = {
                ...filters,
                _page: 1,
            };
            if (minP && maxP) {
                updatedFilters = {
                    ...filters,
                    _page: 1,
                    _minP: minP,
                    _maxP: maxP,
                };
            }

            if (name === "sortPrice" || name === "sortDate") {
                if (name === "sortPrice") {
                    updatedFilters._sort = "price";
                    updatedFilters._order = value;
                } else {
                    updatedFilters._sort = "created_at";
                    updatedFilters._order = value;
                }
            } else {
                updatedFilters[name] = value;
            }

            dispatch(setFilters(updatedFilters));
            const validData = validFilters(updatedFilters);
            const searchParam = new URLSearchParams({
                ...validData,
            });

            navigate(`/product/search?${searchParam}`);
        },
        [dispatch, filters, navigate]
    );

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const queryParams = {};
        params.forEach((value, key) => {
            queryParams[key] = value;
        });

        setCurrentPage(parseInt(queryParams._page) || 1);

        dispatch(setFilters({ ...filters, ...queryParams }));
    }, [location.search, dispatch]);
    useEffect(() => {
        dispatch(fetchFilterProducts());
        setActiveToggle(false);
    }, [dispatch, filters]);

    return (
        <>
            <Helmet>
                <title>
                    {filters._category
                        ? categories.find(
                              (item) => item.id == filters._category
                          ).name + "- Mocmacshop"
                        : null}
                </title>
            </Helmet>

            <div className="filter border-t-2 border-gray-200 py-7 px-10 sm:px-5">
                <div className="flex gap-x-4 justify-between">
                    <button
                        onClick={handleClick}
                        className=" shrink-0 hidden xs:block  text-sm font-semibold py-1 px-3 border-2 border-gray-800 rounded-full"
                    >
                        <i className="fa-solid fa-bars-staggered mr-2"></i>
                    </button>
                    <div
                        className="w-[65%] xs:hidden p-1 md:overflow-x-auto  action-btn flex gap-2 items-center [&::-webkit-scrollbar]:h-2 
                        [&::-webkit-scrollbar-track]:rounded-full 
                        [&::-webkit-scrollbar-track]:bg-gray-200
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-500"
                    >
                        <button
                            onClick={handleClick}
                            className=" shrink-0  text-sm font-semibold py-1 px-4 border-2 border-gray-800 rounded-full"
                        >
                            <i className="fa-solid fa-bars-staggered mr-2"></i>
                            All Filters
                        </button>
                        <div className="relative shrink-0 md:hidden">
                            <button
                                onClick={() => setActiveToggle(!activeToggle)}
                                className="relative text-sm font-semibold py-1  px-3 bg-gray-200 border-2 border-gray-200 rounded-full"
                            >
                                Category{" "}
                                <i className="fa-solid fa-chevron-down text-[10px] ml-2"></i>
                                <span
                                    className={`dot_active absolute top-[-3px] right-0 w-2 h-2 bg-blue-500 rounded-full ${
                                        filters._category ? "" : "hidden"
                                    }`}
                                ></span>
                            </button>
                            <div
                                className={clsx(
                                    "menu-drop absolute z-10 top-0 left-0  transition-all duration-200 w-[200px] transform ease-in-out origin-top-left",
                                    activeToggle
                                        ? " scale-100  z-10 opacity-100"
                                        : "scale-0 opacity-0"
                                )}
                            >
                                <ul className="flex flex-col bg-gray-200 p-2 rounded">
                                    <span
                                        onClick={() => setActiveToggle(false)}
                                        className="text-sm font-semibold"
                                    >
                                        Category
                                    </span>
                                    {categories?.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex items-center p-1 gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                id={item.id}
                                                name="_category"
                                                value={item.id}
                                                onClick={handleChangeFilter}
                                            />
                                            <label
                                                htmlFor={item.id}
                                                className="text-xs font-semibold  cursor-pointer "
                                            >
                                                {item.name}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <button className="md:hidden shrink-0 text-sm font-semibold py-1  px-3 bg-gray-200 border-2 border-gray-200 rounded-full">
                            Materials{" "}
                            <i className="fa-solid fa-chevron-down text-[10px] ml-2"></i>
                        </button>
                        <div className="list_active-filters shrink-0">
                            {filters._category && (
                                <div className="flex items-center gap-2 ">
                                    <span className=" text-sm font-semibold text-gray-700 py-1 px-3 bg-blue-300 border-2 border-blue-300 rounded-full italic">
                                        {
                                            categories.find(
                                                (item) =>
                                                    item.id == filters._category
                                            ).name
                                        }
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <span className="text-xs font-medium text-gray-500 mr-2">
                            total: {dataProduct.total} results
                        </span>
                        <div className="relative ">
                            <button className=" group text-gray-700 text-xs font-medium py-1  px-3 hover:bg-gray-200  rounded-full hover:gr">
                                sort
                                <i className="fa-solid fa-chevron-down text-[10px] ml-2"></i>
                                <div className="menu-drop absolute  z-[-1] opacity-0 right-0  bottom-0 translate-y-full translate-x-[-10%]  transition-all duration-200 w-[160px] transform ease-in-out origin-top-left shadow-xl border   bg-gray-200 group-hover:z-[1] group-hover:opacity-100 ">
                                    <ul className="flex flex-col  px-2 py-3 items-start rounded">
                                        <label className="p-1 hover:bg-gray-300 rounded">
                                            <input
                                                type="checkbox"
                                                hidden
                                                name="sortPrice"
                                                value="asc"
                                                onClick={handleChangeFilter}
                                            />{" "}
                                            Price : Low to High
                                        </label>
                                        <label className="p-1 hover:bg-gray-300 rounded">
                                            <input
                                                type="checkbox"
                                                hidden
                                                name="sortPrice"
                                                value="desc"
                                                onClick={handleChangeFilter}
                                            />{" "}
                                            Price : High to Low
                                        </label>
                                        <label className="p-1 hover:bg-gray-300 rounded">
                                            <input
                                                type="checkbox"
                                                hidden
                                                name="sortDate"
                                                value="desc"
                                                onClick={handleChangeFilter}
                                            />{" "}
                                            Newest
                                        </label>
                                    </ul>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={clsx(
                        "nav-slide overflow-hidden fixed top-0 left-0 w-1/3 lg:w-5/12 md:w-1/2 sm:w-2/3 h-screen z-50 bg-gray-100 transition-all duration-300 ",
                        openSlide ? " translate-x-0" : " translate-x-[-200%]"
                    )}
                >
                    <FilterFormNav
                        onclick={handleClick}
                        filters={filters}
                        data={dataProduct}
                        handleChangeFilter={handleChangeFilter}
                    />
                </div>
                <span
                    onClick={handleClick}
                    className={clsx(
                        "overlay top-0 fixed left-0  h-screen  transition-all duration-200 ",
                        openSlide ? " z-10 bg-[#000c] w-full" : "  z-[-1]"
                    )}
                ></span>
                <div>
                    <Product />
                </div>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={Math.ceil(dataProduct.total / filters._limit)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={
                        "pagination flex justify-center items-center mt-4"
                    }
                    pageClassName={"mx-1"}
                    pageLinkClassName={"px-3 py-1 border rounded"}
                    previousClassName={"px-3 py-1 border rounded mr-2"}
                    nextClassName={"px-3 py-1 border rounded ml-2"}
                    activeClassName={"bg-gray-800 text-white"}
                    forcePage={currentPage - 1}
                />
            </div>
        </>
    );
}
