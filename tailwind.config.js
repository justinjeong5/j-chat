/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        extend: {
            keyframes: {
                load: {
                    "100%": {
                        "background-position": "-100% 100%",
                    },
                },
            },
            animation: {
                load: "load 1.5s infinite",
            },
        },
    },
    plugins: [],
};
