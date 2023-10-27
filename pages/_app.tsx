import type { AppProps } from "next/app";
import { useEffect } from "react";
import { disconnectSocket, initiateSocket } from "socket/index";
import { ThemeProvider } from "styled-components";
import TOKEN from "styles/tokens/index";

export default function App({ Component, pageProps }: AppProps) {
    console.log("App");
    useEffect(() => {
        initiateSocket();
        console.log("connect");
        return () => {
            disconnectSocket();
            console.log("disconnect");
        };
    }, []);
    return (
        <ThemeProvider theme={{ ...TOKEN }}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
