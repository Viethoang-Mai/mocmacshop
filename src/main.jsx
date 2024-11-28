import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./stores/store.js";
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelmetProvider } from "react-helmet-async";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_PUBLIC_CLIENT_ID_GG;

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <Provider store={store}>
                        <HelmetProvider>
                            <App />
                        </HelmetProvider>
                    </Provider>
                </GoogleOAuthProvider>
            </BrowserRouter>
        </StyledEngineProvider>
    </StrictMode>
);
