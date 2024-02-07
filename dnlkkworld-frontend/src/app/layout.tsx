import {ReactNode} from "react";
import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";

import Header from "@/widget/Header/Header";

import "./globals.css";
import {GlobalProvider} from "@/app/_providers";

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
            <GlobalProvider>
                <Header/>
                <div className="wrapper">
                    {children}
                </div>
            </GlobalProvider>
        </body>
        </html>
    );
}
