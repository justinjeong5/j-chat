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
            boxShadow: {
                "scroll-up": "inset 0 11px 8px -10px rgb(0 0 0 / 0.05)",
                "scroll-down": "inset 0 -11px 8px -10px rgb(0 0 0 / 0.05)",
                "scroll-both":
                    "inset 0 11px 8px -10px rgb(0 0 0 / 0.05), inset 0 -11px 8px -10px rgb(0 0 0 / 0.05)",
            },
        },
    },
    plugins: [],
};
