import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Context from "../components";
import SocialIcon from "../components/SocialIcon";
import styles from "../styles/Contacts.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation("contacts");

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.contactsHeader}>{t("contacts")}</div>
        <div className={styles.block}>
          <div className={styles.mapBlock}>
            <div className={styles.map}>
              {
                t("embedMap") === "en" ? (
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2561.4304337983476!2d36.2018808!3d50.0595001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a4179db3bd31%3A0x5283fd46a01c31d0!2sLyudviha%20Svobody%20Ave%2C%2058%2C%20Kharkiv%2C%20Kharkivs&#39;ka%20oblast%2C%2061000!5e0!3m2!1sen!2sua!4v1652520144391!5m2!1sen!2sua" width="600" height="450" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                ) : (
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2561.4304337983476!2d36.2018808!3d50.0595001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a4179db3bd31%3A0x5283fd46a01c31d0!2z0L_RgNC-0YHQv9C10LrRgiDQm9GO0LTQstGW0LPQsCDQodCy0L7QsdC-0LTQuCwgNTgsINCl0LDRgNC60ZbQsiwg0KXQsNGA0LrRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDYxMDAw!5e0!3m2!1suk!2sua!4v1652520508147!5m2!1suk!2sua" width="600" height="450" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                )
              }
            </div>
          </div>
          <div className={styles.descr}>
            <div className={styles.workTime}>
              {/* TODO create conncetion from DB */}
              {t("workTime", { from: "9.00", till: "21.00" })} 
            </div>
            <div className={styles.address}>
              <a href={t("shareMap")} target="_blank" rel="noreferrer">
                {t("mapPlace")}
              </a>
            </div>
            <div className={styles.phone}>
              <a href="tel:+380974561132" target="_blank" rel="noreferrer">
                {t("phone", { phone: "+38 (097) 456-11-32"})}
              </a>
            </div>
            <div className={styles.mail}>
              <a href="mailto:charivnica@gmail.com" target="_blank" rel="noreferrer">
                {t("mail", { email: "charivnica@gmail.com" })}
              </a>
            </div>
            <div className={styles.line}></div>
            <div className={styles.socialMedia}>
              <SocialIcon imagePath="/images/IG_Icon.png" linkUrl="https://instagram.com/" imgAlt="Instagram" width={45} height={45}/>
              <SocialIcon imagePath="/images/FB_Icon.png" linkUrl="https://facebook.com/" imgAlt="Facebook" width={45} height={45} />
            </div>
          </div>
        </div>
      </main>
    </Context>
  );
};

export default Home;
