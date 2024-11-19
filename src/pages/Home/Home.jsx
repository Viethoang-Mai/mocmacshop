import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../stores/slices/productSlice";
import { Helmet } from "react-helmet";
import FeatureCategories from "./FeatureCategories";

import SlideShow from "./SlideShow";
import TopTrend from "./TopTrend";
import AmzDeal from "./AmzDeal/AmzDeal";
import HolidayDeal from "./HolidayDeal";
import About from "./About";
import Login from "../Login/Login";
export default function Home() {
    // const data = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.product.categories);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <section>
            <Helmet>
                <title>mocmacshop || Home</title>
            </Helmet>
            {Object.keys(user).length !== 0 && (
                <div className="text-2xl text-center py-4 flex items-center justify-center flex-wrap gap-2 bg-[#f59e0b78] text-gray-700">
                    Welcome back,{" "}
                    <span className="font-semibold ">{user.name}</span>
                </div>
            )}
            <div className="relative z-[0] user-select-none ">
                <SlideShow />
            </div>
            <div className="py-7 px-20 xl:px-10 lg:px-16 md:px-7 xxs:px-5 mt-[-15%] xl:mt-[-19%] relative z-[1]  ">
                <TopTrend />
                <AmzDeal />
                <FeatureCategories data={categories} />
                <HolidayDeal />
            </div>
            <About />
        </section>
    );
}
