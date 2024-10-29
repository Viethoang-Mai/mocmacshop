/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xxl: { max: "1599.98px" },
            xl: { max: "1279.98px" },
            lg: { max: "1099.98px" },
            md: { max: "991.98px" },
            sm: { max: "767.98px" },
            xs: { max: "575.98px" },
            xxs: { max: "467.98px" },
        },
        extend: {
            boxShadow: {
                trendItem:
                    " 0px 2px 4px 0px rgba(14, 30, 37, 0.12),  0px 2px 16px 0px rgba(14, 30, 37, 0.32)",
            },
            colors: {
                "custom-blue": "rgba(178, 204, 218, 0.8)",
                "custom-white": "rgba(255, 255, 255, 1)",
            },
        },
    },
    plugins: [],
};
