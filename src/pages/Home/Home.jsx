import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../stores/slices/productSlice";

import FeatureCategories from "./FeatureCategories";
import SlideShow from "./SlideShow";
import TopTrend from "./TopTrend";
import AmzDeal from "./AmzDeal/AmzDeal";
import HolidayDeal from "./HolidayDeal";
import About from "./About";
export default function Home() {
    const data = useSelector((state) => state.product.products);
    const categories = useSelector((state) => state.product.categories);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <section>
            <div className="relative z-[0] user-select-none ">
                <SlideShow />
            </div>
            <div className="py-7 px-20 xl:px-10 lg:px-16 md:px-8 mt-[-15%] xl:mt-[-19%] relative z-[1]  ">
                <TopTrend />
                <AmzDeal />
                <FeatureCategories data={categories} />
                <HolidayDeal />
            </div>
            <About />
        </section>
    );
}
