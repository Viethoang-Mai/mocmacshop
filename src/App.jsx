import Layout from "./core/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";

function App() {
    return (
        <>
            <Login />
            <Layout />
            <ToastContainer autoClose={2000} position="top-right" />
        </>
    );
}

export default App;
