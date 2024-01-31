'use client';

import {useRouter} from "next/navigation";

import Chat from "@/widget/Chat/Chat";
import styles from "@/app/(router)/page.module.scss";
import Dialogs from "@/widget/Dialogs/Dialogs";
import {useAppSelector} from "@/shared/hooks/rtk";
import {selectScreen} from "@/app/_providers/Adaptivity/store/adaptivitySlice";
import {selectFromId, selectToId} from "@/entity/Dialog/store/dialogSlice";
import {getRoomIdByUsers} from "@/entity/Dialog/model/getRoomIdByUsers";

export default function Home({params: {chatId}}: {params: {chatId: string}}) {
    const router = useRouter();
    const fromId = useAppSelector(selectFromId);
    const toId = useAppSelector(selectToId);
    const screen = useAppSelector(selectScreen);
    if (!toId || chatId !== getRoomIdByUsers(fromId, toId)) {
        router.push(`/im`);
        return null;
    }
    const isMobile = screen === 'mobileS' || screen === 'tablet';
    return (
        <>
            {!isMobile && <Dialogs/>}
            {<Chat fromId={fromId} toId={toId} className={styles.chat}/>}
        </>
    );
}