import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilterProducts } from "../stores/slices/filterProductSlice";
import Product from "../pages/Products/Product";
import ReactPaginate from "react-paginate";
import { setFilters } from "../stores/slices/filterProductSlice";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";
import validFilters from "../utils/validFilters";
import NavSlide from "../layouts/DefaultLayout/Header/components/NavSlide";

export default function Filter() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const categories = JSON.parse(localStorage.getItem("categories"));
    const dataProduct = useSelector((state) => state.filters.filterProducts);

    const filters = useSelector((state) => state.filters.filters);
    const [activeToggle, setActiveToggle] = useState(false);
    const [openSlide, setOpenSlide] = useState(false);

    const [filterProducts, setFilterProducts] = useState(filters);

    const [currentPage, setCurrentPage] = useState(0);

    const handleClick = () => {
        setOpenSlide(!openSlide);
    };

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
    const handleChangeFilter = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setFilters({ ...filters, [name]: value }));
        const validData = validFilters(filters);
        const searchParam = new URLSearchParams({
            ...validData,
            [name]: value,
            _page: 1,
        });

        navigate(`/product/search?${searchParam}`);
    };

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
        <div className="filter border-t-2 border-gray-200 pt-7">
            <div className="action-btn flex gap-2 items-center">
                <button
                    onClick={handleClick}
                    className="  text-sm font-semibold py-1 px-4 border-2 border-gray-800 rounded-full"
                >
                    <i className="fa-solid fa-bars-staggered mr-2"></i>
                    All Filters
                </button>
                <div className="relative">
                    <button
                        onClick={() => setActiveToggle(!activeToggle)}
                        className="C text-sm font-semibold py-1  px-3 bg-gray-200 border-2 border-gray-200 rounded-full"
                    >
                        Category{" "}
                        <i className="fa-solid fa-chevron-down text-[10px] ml-2"></i>
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
                            <span className="text-sm font-semibold">
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
                <button className=" text-sm font-semibold py-1  px-3 bg-gray-200 border-2 border-gray-200 rounded-full">
                    Price{" "}
                    <i className="fa-solid fa-chevron-down text-[10px] ml-2"></i>
                </button>
                <button className=" text-sm font-semibold py-1  px-3 bg-gray-200 border-2 border-gray-200 rounded-full">
                    Rating
                    <i className="fa-solid fa-chevron-down text-[10px] ml-2"></i>
                </button>
                <button></button>
                <div className="ml-auto">
                    <span className="text-xs font-medium text-gray-500 mr-2">
                        total: {dataProduct.total} results
                    </span>
                    <button className=" text-gray-700 text-sm font-medium py-1  px-3 bg-gray-200 border-2 border-gray-200 rounded-full">
                        Price: low to high{" "}
                        <i className="fa-solid fa-chevron-down text-[10px] ml-2"></i>
                    </button>
                </div>
            </div>
            <div
                className={clsx(
                    "nav-slide fixed top-0 left-0 w-1/4 md:w-1/3 xs:w-5/12 xxs:w-6/12 h-screen z-50 bg-white transition-all duration-300 ",
                    openSlide ? " translate-x-0" : " translate-x-[-200%]"
                )}
            >
                <NavSlide />
            </div>
            <span
                onClick={handleClick}
                className={clsx(
                    "overlay top-0 fixed left-0  h-screen  transition-all duration-200 ",
                    openSlide ? " z-10 bg-[#000c] w-full" : "  z-[-1]"
                )}
            ></span>
            <div>
                <Product data={dataProduct.data} />
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
    );
}
