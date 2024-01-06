"use client";

import "./globals.css";

// import { Metadata } from "next";
import { ThemeProvider } from "styled-components";
import TOKEN from "styles/tokens/index";

// export const metadata: Metadata = {
//     title: "J-Chat",
//     description: "Welcome to J-Chat",
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={{ ...TOKEN }}>{children}</ThemeProvider>
            </body>
        </html>
    );
}
