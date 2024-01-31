'use client';

import Dialogs from "@/widget/Dialogs/Dialogs";
import EmptyChat from "@/widget/Chat/EmptyChat";
import {useAppSelector} from "@/shared/hooks/rtk";
import {selectScreen} from "@/app/_providers/Adaptivity/store/adaptivitySlice";

export default function Home() {
    const screen = useAppSelector(selectScreen);
    const isMobile = screen === 'mobileS' || screen === 'tablet';
    return (
        <>
            <Dialogs />
            {!isMobile && <EmptyChat  />}
        </>
    )
}