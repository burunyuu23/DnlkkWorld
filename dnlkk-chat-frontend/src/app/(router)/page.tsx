import Dialogs from "@/widget/Dialogs/Dialogs";
import Chat from "@/widget/Chat/Chat";

import styles from './page.module.scss';

export default function Home() {
  return (
      <main className={styles.main}>
          <Dialogs className={styles.dialogs}/>
          <Chat className={styles.chat}/>
      </main>
  );
}
