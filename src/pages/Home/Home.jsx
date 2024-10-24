import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../stores/slices/productSlice";
import TopTrend from "./components/TopTrend";
export default function Home() {
    const data = useSelector((state) => state.product.products);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    return (
        <section className="p-8 ">
            <TopTrend />
        </section>
    );
}
