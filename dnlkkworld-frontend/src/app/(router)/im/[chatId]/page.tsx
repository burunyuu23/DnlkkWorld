'use client';

import {useRouter} from "next/navigation";

import Chat from "@/widget/Chat/Chat";
import Dialogs from "@/widget/Dialogs/Dialogs";
import {useAppSelector} from "@/shared/hooks/rtk";
import {selectFromId, selectToId} from "@/entity/Dialog/store/dialogSlice";
import {getRoomIdByUsers} from "@/entity/Dialog/model/getRoomIdByUsers";

import styles from './page.module.scss';

export default function Home({params: {chatId}}: {params: {chatId: string}}) {
    const router = useRouter();
    const fromId = useAppSelector(selectFromId);
    const toId = useAppSelector(selectToId);
    if (!toId || chatId !== getRoomIdByUsers(fromId, toId)) {
        router.push(`/im`);
        return null;
    }
    return (
        <>
            <Dialogs className={styles.dialogs}/>
            <Chat fromId={fromId} toId={toId}/>
        </>
    );
}