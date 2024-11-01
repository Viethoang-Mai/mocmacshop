import Layout from "./core/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <Layout />
            <ToastContainer autoClose={2000} position="top-right" />
        </>
    );
}

export default App;
