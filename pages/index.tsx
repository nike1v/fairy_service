import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import Context from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation("home");

  return (
    <Context>
      <main className={styles.main}>
        <h3 className={styles.floatingName}>{t("beautyName")}</h3>
        <h1 className={styles.mainHeadText}>{t("mainHeadText")}<br />{t("mainHeadTextAdd")}</h1>
        <Link href={"/services"}>
          <div className={styles.checkButtonContainer}>
            <div className={styles.checkButton}>
              <span className={styles.checkButtonText}>
                {t("buttonText")}
              </span>
            </div>
          </div>
        </Link>
      </main>
    </Context>
  );
};

export default Home;
