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
        extend: {},
    },
    plugins: [],
};
