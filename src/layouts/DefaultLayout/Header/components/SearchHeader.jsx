import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "../../../../utils/debounce";
import TopSearch from "./TopSearch";
import {
    fetchSuggestionProducts,
    setFiltersSuggestion,
} from "../../../../stores/slices/filterProductSlice";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

function SearchHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sugFilters = useSelector((state) => state.filters.suggestFilters);
    const dataSearch = useSelector((state) => state.filters.suggestProducts);

    const [searchText, setSearchText] = useState("All");
    const [openResult, setOpenResult] = useState(false);
    const [showTopSearch, setShowTopSearch] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const categories = JSON.parse(localStorage.getItem("categories"));
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        if (name === "_category") {
            if (value === "") {
                dispatch(
                    setFiltersSuggestion({ ...sugFilters, [name]: value })
                );

                return setSearchText("All");
            }
            setSearchText(categories.find((item) => item.id == value).name);
        }
        setInputValue(value);
        if (value === "") {
            return setShowTopSearch(true);
        }
        setShowTopSearch(false);

        dispatch(setFiltersSuggestion({ ...sugFilters, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const search = Object.fromEntries([...new FormData(e.target)]);

        setOpenResult(false);

        navigate(`/product/search?${new URLSearchParams(search).toString()}`);
    };
    useEffect(() => {
        dispatch(fetchSuggestionProducts());
    }, [dispatch, sugFilters]);
    // useEffect(() => {

    //     dispatch(fetchFilterProducts());
    // }, [dispatch, filters]);
    return (
        <form
            onSubmit={handleSubmit}
            className=" relative flex w-full bg-white rounded-md   "
        >
            <div className="nav-left relative w-fit  ">
                <div className="btn-filter  text-xs py-1 px-3 md:px-2 bg-gray-300 h-full text-sm text-black flex items-center cursor-pointer rounded-s-md">
                    {categories?.find((item) => item.id == searchText)
                        ? categories?.find((item) => item.id == searchText).name
                        : searchText}
                    <i className="fa-solid fa-caret-down ml-2"></i>
                </div>
                <select
                    onChange={debounce(handleChangeInput, 350)}
                    className="categories-select mt-1 z-100 absolute text-black outline-none border-0 top-0 left-0 h-full w-full rounded-md opacity-0 font-medium  "
                    name="_category"
                    id="categories"
                    defaultValue={searchText}
                >
                    <option
                        value={""}
                        className="bg-gray-50 text-[#68c4cf] font-medium "
                    >
                        All
                    </option>
                    {categories?.map((item, index) => (
                        <option
                            value={item.id}
                            key={index}
                            className="bg-gray-50 text-[#68c4cf] font-medium "
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grow relative">
                <input
                    className=" text-black text-sm font-medium nav-search  px-2 outline-none border-2  border-white/0 focus:border-amber-700 w-full h-full  "
                    type="text"
                    placeholder="Search"
                    name="q"
                    onFocus={(e) => {
                        setOpenResult(true);
                        if (e.target.value === "") {
                            return setShowTopSearch(true);
                        }
                    }}
                    onChange={debounce(handleChangeInput, 350)}
                />
                <i
                    onClick={() => setOpenResult(false)}
                    className={`fa-solid fa-xmark absolute right-3 top-1/2 -translate-y-1/2 text-gray-800 cursor-pointer ${
                        openResult ? "block" : "hidden"
                    }`}
                ></i>
            </div>
            <button className="nav-search-btn px-3 py-1 text-xl bg-amber-500 rounded-e-md">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <div
                className={`result-search absolute  top-12 rounded-md left-0 w-full bg-gray-100 shadow-trendItem p-5  ${
                    openResult
                        ? "h-[300px] z-10 opacity-100"
                        : "h-0 z-[-1] opacity-0"
                }`}
            >
                {showTopSearch ? (
                    <TopSearch />
                ) : (
                    <SearchResult data={dataSearch?.data} />
                )}
            </div>
        </form>
    );
}

export default memo(SearchHeader);
