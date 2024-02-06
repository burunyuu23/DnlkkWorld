import Dialogs from "@/widget/Dialogs/Dialogs";
import EmptyChat from "@/widget/Chat/EmptyChat";

import styles from './page.module.scss';

export default function Home() {
    return (
        <>
            <Dialogs />
            <EmptyChat className={styles.chat} />
        </>
    )
}