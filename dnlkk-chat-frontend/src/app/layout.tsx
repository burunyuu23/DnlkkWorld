import {ReactNode} from "react";
import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";

import Header from "@/widget/Header/Header";

import {StoreProvider, ThemeProvider} from "./_providers";
import "./globals.css";
import {SocketProvider} from "@/app/_providers/Sockets";
import {AdaptivityProvider} from "@/app/_providers/Adaptivity";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "DnlkkChat",
    description: "Чат от Dnlkk",
    icons: '/favicon.ico',
    manifest: '/manifest.json',
};

export const viewport: Viewport = {
    themeColor: "#71eb71",
};

type LayoutProps = Readonly<{ children: ReactNode }>;

export default function RootLayout({children}: LayoutProps) {
    return (
        <html lang="ru">
        <body className={inter.className}>
        <StoreProvider>
            <SocketProvider>
                <AdaptivityProvider>
                    <ThemeProvider>
                        <Header/>
                        <div className="wrapper">
                            {children}
                        </div>
                    </ThemeProvider>
                </AdaptivityProvider>
            </SocketProvider>
        </StoreProvider>
        </body>
        </html>
    );
}
