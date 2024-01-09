import "@app/globals.css";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "J-Chat",
    description: "Welcome to J-Chat",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className="font-sans">{children}</body>
        </html>
    );
}
