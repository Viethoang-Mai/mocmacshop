import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../stores/slices/productSlice";
import TopTrend from "./components/TopTrend";
import SlideShow from "./components/SlideShow";
import FeatureCategories from "./components/FeatureCategories";
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
            <div className="p-8 mt-[-19%] relative z-[1]  ">
                <TopTrend />
                <FeatureCategories data={categories} />
            </div>
        </section>
    );
}
