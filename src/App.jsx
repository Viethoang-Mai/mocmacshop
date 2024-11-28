import Layout from "./core/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
    return (
        <>
            <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f59e0b54">
                <Login />
                <Layout />
                <ToastContainer autoClose={1000} position="top-right" />
            </SkeletonTheme>
        </>
    );
}

export default App;
