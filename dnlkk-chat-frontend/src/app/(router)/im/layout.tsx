'use client';

import {ReactNode} from "react";
import {useAppSelector} from "@/shared/hooks/rtk";
import {selectScreen} from "@/app/_providers/Adaptivity/store/adaptivitySlice";
import styles from "@/app/(router)/page.module.scss";
import cl from "classnames";
import Menu from "@/widget/Menu/Menu";

export default function ChatLayout({children}: { children: ReactNode }) {
    const screen = useAppSelector(selectScreen);
    const isMobile = screen === 'mobileS' || screen === 'tablet';
    return (
        <div className={cl(styles.wrapper, isMobile && styles.wrapperMobile)}>
            <main className={cl(styles.main, isMobile && styles.mainMobile)}>
                {children}
            </main>
            <Menu/>
        </div>
    );
};
