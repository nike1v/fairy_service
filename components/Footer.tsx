import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

import styles from "../styles/Footer.module.css";

const Footer: NextPage = () => {
  const { t } = useTranslation("common");
  return (
    <footer className={styles.footer}>
      <div className={styles.iconWithText}>
        <Image src={"/images/phone.png"} alt={"Phone"} width={25} height={25} />
        <span className={styles.texts}><a href="tel:+3809754561132">+38 (097) 456-11-32</a></span>
      </div>
      <div className={styles.iconWithText}>
        <Image src={"/images/clock.png"} alt={"Working time"} width={25} height={25} />
        <span className={styles.texts}>9.00 - 21.00</span>
      </div>
      <div className={styles.copyright}>
				&copy; 2022 {t("copyright")}
      </div>
    </footer>
  );
};

export default Footer;