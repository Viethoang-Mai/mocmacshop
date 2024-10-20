import Footer from "./Footer";
import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <ScrollToTop />
            <Footer />
        </>
    );
}
