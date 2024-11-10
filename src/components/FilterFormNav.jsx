import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import validMinMax from "../utils/validInputMinMax";
import { resetFilters } from "../stores/slices/filterProductSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function FilterFormNav({ onclick, filters, data, handleChangeFilter }) {
    const categories = JSON.parse(localStorage.getItem("categories"));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checkedPrice, setCheckedPrice] = useState(false);
    const [minP, setMinP] = useState(filters._minP);
    const [maxP, setMaxP] = useState(filters._maxP);
    const colors = ["yellow", "black", "white", "blue", "red"];
    const materials = ["plastic", "wood", "metal", "glass"];
    const handleReset = () => {
        dispatch(resetFilters());
        navigate("/product/search?");
    };

    return (
        <nav className=" ">
            <div className="nav-slide pb-4 text-[#fff8ed]  ">
                <div className="header px-6 py-3 flex gap-x-2 bg-[#1c4c51]">
                    <i className="fa-regular fa-user text-2xl"></i>
                    <span className="text-2xl ">Hi, </span>
                </div>
                <div
                    className=" overflow-y-auto h-[calc(100vh-130px)] [&::-webkit-scrollbar]:w-2
                    [&::-webkit-scrollbar-track]:rounded-full
                    [&::-webkit-scrollbar-track]:bg-gray-200
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-500"
                >
                    <h3 className="font-semibold text-2xl text-gray-700  text-center mt-4">
                        Filter
                    </h3>
                    <form className="relative content px-6 py-3 text-black flex overflow-hidden flex-col gap-y-5">
                        <span
                            onClick={handleReset}
                            className="absolute text-sm font-medium top-2 right-[10%] cursor-pointer px-3 py-1 bg-gray-300 rounded-full hover:bg-gray-400"
                        >
                            reset
                        </span>
                        <div className="categories">
                            <ul className="">
                                <h4 className="font-semibold mb-2">Category</h4>
                                {categories.map((category) => (
                                    <li key={category.id} className="px-4">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center cursor-pointer">
                                                <input
                                                    name="_category"
                                                    type="radio"
                                                    checked={
                                                        filters._category ==
                                                        category.id
                                                    }
                                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-slate-300 checked:border-slate-400 transition-all"
                                                    id={
                                                        "category_" +
                                                        category.id
                                                    }
                                                    value={category.id}
                                                    onClick={handleChangeFilter}
                                                />
                                                <span className="absolute bg-slate-800 w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                            </label>
                                            <label
                                                className="ml-2 text-slate-800 cursor-pointer text-xs font-semibold"
                                                htmlFor={
                                                    "category_" + category.id
                                                }
                                            >
                                                {category.name}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="price">
                            <ul className="">
                                <h4 className="font-semibold mb-2">Price</h4>

                                <li className="px-4">
                                    <div className="inline-flex items-center">
                                        <label className="relative flex items-center cursor-pointer">
                                            <input
                                                name="price"
                                                type="radio"
                                                checked={!checkedPrice}
                                                onChange={() =>
                                                    setCheckedPrice(false)
                                                }
                                                className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-slate-300 checked:border-slate-400 transition-all"
                                                id={"price_any"}
                                            />
                                            <span className="absolute bg-slate-800 w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                        </label>
                                        <label
                                            className="ml-2 text-slate-800 cursor-pointer text-xs font-semibold"
                                            htmlFor={"price_any"}
                                        >
                                            Any price
                                        </label>
                                    </div>
                                </li>
                                <li className="px-4">
                                    <div className="inline-flex items-center">
                                        <label className="relative flex items-center cursor-pointer">
                                            <input
                                                name="price"
                                                type="radio"
                                                className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-slate-300 checked:border-slate-400 transition-all"
                                                id={"price_custom"}
                                                checked={checkedPrice}
                                                onChange={() =>
                                                    setCheckedPrice(true)
                                                }
                                            />
                                            <span className="absolute bg-slate-800 w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                        </label>
                                        <label
                                            className="ml-2 text-slate-800 cursor-pointer text-xs font-semibold"
                                            htmlFor={"price_custom"}
                                        >
                                            Custom
                                        </label>
                                    </div>
                                    <div>
                                        <input
                                            name="_minP"
                                            className="w-20 h-8 p-2 border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-gray-100 placeholder:text-xs font-medium"
                                            placeholder="Min"
                                            type="text"
                                            value={minP}
                                            onChange={(e) => {
                                                validMinMax(e.target.value) &&
                                                    setMinP(e.target.value);
                                            }}
                                            onClick={() => {
                                                setCheckedPrice(true);
                                            }}
                                        />
                                        <span className="px-2 text-sm font-medium">
                                            to
                                        </span>
                                        <input
                                            name="_maxP"
                                            className="w-20 h-8 p-2 border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 bg-gray-100 placeholder:text-xs font-medium"
                                            placeholder="Max"
                                            type="text"
                                            value={maxP}
                                            onChange={(e) => {
                                                validMinMax(e.target.value) &&
                                                    setMaxP(e.target.value);
                                            }}
                                            onClick={() => {
                                                setCheckedPrice(true);
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                handleChangeFilter(
                                                    e,
                                                    minP,
                                                    maxP
                                                );
                                            }}
                                            className=" ml-2 mt-2 text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-200"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="rating">
                            <ul className="">
                                <h4 className="font-semibold mb-2">Rating</h4>
                            </ul>
                        </div>
                        <div className="colors">
                            <ul className="">
                                <h4 className="font-semibold mb-2">
                                    Color (demo)
                                </h4>
                                {colors.map((color, index) => (
                                    <li key={index} className="px-4">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center cursor-pointer">
                                                <input
                                                    name="color"
                                                    type="radio"
                                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-slate-300 checked:border-slate-400 transition-all"
                                                    id={"color_" + color}
                                                    value={"color_" + color}
                                                />
                                                <span className="absolute bg-slate-800 w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                            </label>
                                            <label
                                                className="ml-2 text-slate-800 cursor-pointer text-xs font-semibold capitalize"
                                                htmlFor={"color_" + color}
                                            >
                                                {color}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="materials">
                            <ul className="">
                                <h4 className="font-semibold mb-2">
                                    Material (demo)
                                </h4>
                                {materials.map((material, index) => (
                                    <li key={index} className="px-4">
                                        <div className="inline-flex items-center">
                                            <label className="relative flex items-center cursor-pointer">
                                                <input
                                                    name="material"
                                                    type="radio"
                                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-slate-300 checked:border-slate-400 transition-all"
                                                    id={"material_" + material}
                                                    value={
                                                        "material_" + material
                                                    }
                                                />
                                                <span className="absolute bg-slate-800 w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                            </label>
                                            <label
                                                className="ml-2 text-slate-800 cursor-pointer text-xs font-semibold capitalize"
                                                htmlFor={"material_" + material}
                                            >
                                                {material}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </form>
                </div>
                <div className=" border-t-2 border-slate-300 p-2  ">
                    <button
                        onClick={onclick}
                        className="btn rounded-full w-full px-3 py-2 mt-2 text-white font-semibold bg-slate-800"
                    >
                        Filter{" "}
                        <span className="text-xs">{`(${
                            data.total ? data.total : 0
                        } results)`}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
FilterFormNav.propTypes = {
    onclick: PropTypes.func,
    filters: PropTypes.object,
    data: PropTypes.object,
    handleChangeFilter: PropTypes.func,
};
export default memo(FilterFormNav);
