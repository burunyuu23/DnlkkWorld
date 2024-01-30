import {ReactNode} from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";

import Header from "@/widget/Header/Header";

import {StoreProvider, ThemeProvider} from "./_providers";
import "./globals.css";
import {SocketProvider} from "@/app/_providers/Sockets";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "DnlkkChat",
    description: "Чат от Dnlkk",
    icons: '/favicon.ico',
};

type LayoutProps = Readonly<{ children: ReactNode }>;

export default function RootLayout({children}: LayoutProps) {
    return (
        <html lang="ru">
        <body className={inter.className}>
        <StoreProvider>
            <SocketProvider>
                <ThemeProvider>
                    <Header/>
                    {children}
                </ThemeProvider>
            </SocketProvider>
        </StoreProvider>
        </body>
        </html>
    );
}
