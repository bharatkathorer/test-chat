module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#4961A9",
                    hover: "#3A4E87",
                    focus: "#DBE0F0",
                    active: "#2D3B67",
                    disabled: "#B4BFDF",
                    dark: "#1f2937",
                    light: "#6b7280",
                    bar: "#c9e6fc",
                    active2: "#d6e2fb",
                    hover2: "#eaebef",
                },
                error: {
                    DEFAULT: "#991B1B",
                    hover: "#B91C1C",
                    darkest: "#991B1B",
                    focus: "#B91C1C",
                    dark: "#B91C1C",
                    light: "#F87171",
                    lightest: "#FEF2F2",
                },
                info: {
                    DEFAULT: "#204ed9",
                    hover: "#2244a4",
                    focus: "#DBE0F0",
                    active: "#2D3B67",
                    disabled: "#B4BFDF",
                    dark: "#1f2937",
                    light: "#6b7280",
                    bar: "#c9e6fc",
                    active2: "#d6e2fb",
                    hover2: "#eaebef",
                },
                success: {
                    DEFAULT: "#31b245",
                    hover: "#3A4E87",
                    focus: "#DBE0F0",
                    active: "#2D3B67",
                    disabled: "#B4BFDF",
                    dark: "#1f2937",
                    light: "#6b7280",
                    bar: "#c9e6fc",
                    active2: "#d6e2fb",
                    hover2: "#eaebef",
                },
                warning: {
                    DEFAULT: "#4961A9",
                    hover: "#3A4E87",
                    focus: "#DBE0F0",
                    active: "#2D3B67",
                    disabled: "#B4BFDF",
                    dark: "#1f2937",
                    light: "#6b7280",
                    bar: "#c9e6fc",
                    active2: "#d6e2fb",
                    hover2: "#eaebef",
                },
                secondary: {
                    DEFAULT: "#4961A9",
                    hover: "#3A4E87",
                    focus: "#DBE0F0",
                    active: "#2D3B67",
                    disabled: "#B4BFDF",
                    dark: "#1f2937",
                    light: "#6b7280",
                    bar: "#c9e6fc",
                    active2: "#d6e2fb",
                    hover2: "#eaebef",
                },
                body: "#EDF0F7",
                stroke: "#E5E7EB",
            },
            fontFamily: {
                sans: ['Figtree'],
            },
            fontSize: {
                xxs: [
                    "10px",
                    {
                        letterSpacing: "0.025rem",
                    },
                ],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
