/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            xxl: { max: "1599.98px" },
            xl: { max: "1279.98px" },
            lg: { max: "1023.98px" },
            md: { max: "767.98px" },
            sm: { max: "639.98px" },
            xs: { max: "576.98px" },
        },
        extend: {},
    },
    plugins: [],
};
