import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./stores/store.js";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </StyledEngineProvider>
    </StrictMode>
);
