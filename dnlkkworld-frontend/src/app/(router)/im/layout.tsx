import {ReactNode} from "react";

import styles from "@/app/(router)/page.module.scss";
import Menu from "@/widget/Menu/Menu";

export default function ChatLayout({children}: { children: ReactNode }) {
    return (
        <div className={styles.wrapper}>
            <main className={styles.main}>
                {children}
            </main>
            <Menu/>
        </div>
    );
};
