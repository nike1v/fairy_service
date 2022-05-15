import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import Context from "../components";
import styles from "../styles/News.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation("news");

  return (
    <Context>
      <main className={styles.newsContainer}>
        <div className={styles.newsBlock}>
          <div className={styles.newsImage}>
            <Image src={"/images/news_1_img.png"} alt={t("imageTextOpened")} width={650} height={480} />
          </div>
          <div className={styles.detailsTexts}>
            <div className={styles.detailsDate}>
              {t("newsDate")}
            </div>
            <div className={styles.detailsHeader}>
              {t("newsHeader").toUpperCase()}
            </div>
            <div className={styles.detailsDescription}>
              {t("newsDescr")}
            </div>
            <div className={styles.detailsButton}>
              <Link href={"/services"}>
                <a>{t("newsButtonText")}</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Context>
  );
};

export default Home;
