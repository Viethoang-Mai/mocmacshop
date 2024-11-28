import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function CheckoutGuard() {
    const dataCurrent = localStorage.getItem("current");
    const location = useLocation();
    const { current, stepsOrder } = useSelector((state) => state.checkoutStep);
    const pathStep = location.pathname.split("/").pop();
    console.log(pathStep);

    if (pathStep === "done" && !dataCurrent) return <Navigate to={`/orders`} />;
    if (!dataCurrent || !pathStep) {
        return <Navigate to={`/cart`} />;
    }
    const stepIndex = stepsOrder.indexOf(pathStep);
    const prevStepIndex = stepsOrder.indexOf(current);
    console.log(+stepIndex, prevStepIndex, current);

    if (+stepIndex > prevStepIndex) {
        return <Navigate to={`/checkout/${stepsOrder[prevStepIndex]}`} />;
    }

    return <Outlet />;
}
