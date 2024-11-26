import Footer from "./Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main className="relative min-h-fit">
                <Outlet />
            </main>
            <ScrollToTop />
            <Footer />
        </>
    );
}
