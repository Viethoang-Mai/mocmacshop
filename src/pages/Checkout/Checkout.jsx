import { Outlet } from "react-router-dom";
import StepMap from "./components/Step";
import HorizontalLinearStepper from "./components/Step";

export default function Checkout() {
    return (
        <section className="py-7 px-20 xl:px-10 lg:px-16 md:px-7 xxs:px-5  ">
            <header className="flex items-center gap-x-3 border-b border-gray-200 pb-3">
                <div className="heading w-1/3 flex items-center gap-x-3">
                    <i className="fa-solid fa-lock"></i>
                    <h2 className="font-medium">Security checkout</h2>
                </div>
                <div className="step grow">
                    <HorizontalLinearStepper />
                </div>
            </header>
            <div>
                <Outlet />
            </div>
        </section>
    );
}
