import Dialogs from "@/widget/Dialogs/Dialogs";
import Chat from "@/widget/Chat/Chat";
import Menu from "@/widget/Menu/Menu";

import styles from './page.module.scss';

export default function Home() {
  return (
      <div className={styles.wrapper}>
          <main className={styles.main}>
              <Menu />
              <Dialogs className={styles.dialogs}/>
              <Chat className={styles.chat}/>
          </main>
      </div>
  );
}
