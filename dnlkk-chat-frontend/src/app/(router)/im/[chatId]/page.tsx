'use client';

import Chat from "@/widget/Chat/Chat";
import styles from "@/app/(router)/page.module.scss";
import Dialogs from "@/widget/Dialogs/Dialogs";
import {useAppSelector} from "@/shared/hooks/rtk";
import {selectScreen} from "@/app/_providers/Adaptivity/store/adaptivitySlice";

export default function Home() {
    const screen = useAppSelector(selectScreen);
    const isMobile = screen === 'mobileS' || screen === 'tablet';
    return (
        <>
            {!isMobile && <Dialogs/>}
            <Chat className={styles.chat}/>
        </>
    );
}