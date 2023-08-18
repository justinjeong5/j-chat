import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import TOKEN from "styles/tokens/index";

// import initApp from "../initApp";

export default function App({ Component, pageProps }: AppProps) {
    // initApp();
    return (
        <ThemeProvider theme={{ ...TOKEN }}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
