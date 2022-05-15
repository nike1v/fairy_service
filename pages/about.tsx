import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Context from "../components";
import styles from "../styles/About.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation("about");

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.imagesBlock}>
          <div className={styles.imageOne}>
            <Image src="/images/about_1.png" alt="Image #1" width={300} height={365} />
          </div>
          <div className={styles.imageTwo}>
            <Image src="/images/about_2.png" alt="Image #2" width={340} height={260} />
          </div>
        </div>
        <div className={styles.lineVertical}></div>
        <div className={styles.aboutBlock}>
          <div className={styles.aboutHeader}>
            {t("aboutHeader")}
          </div>
          <div className={styles.aboutDescr}>
            {t("aboutDescr")}
          </div>
        </div>
      </main>
    </Context>
  );
};

export default Home;
