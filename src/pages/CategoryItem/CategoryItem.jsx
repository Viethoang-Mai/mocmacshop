import { useParams } from "react-router-dom";
import Product from "../Products/Product";
export default function CategoryItem({}) {
    console.log(useParams);

    return (
        <div>
            CategoryItem
            <Product />
        </div>
    );
}
