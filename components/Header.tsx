import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import SocialIcon from "./SocialIcon";

import styles from "../styles/Header.module.css";

const Header: NextPage = () => {
  const { t, lang } = useTranslation("common");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { asPath } = useRouter();

  const usePersistLocaleCookie = () => {
    const { locale, defaultLocale } = useRouter();
	
    useEffect(persistLocaleCookie, [locale, defaultLocale]);
    function persistLocaleCookie() {
      const date = new Date();
      const expireMs = 100 * 24 * 60 * 60 * 1000; // 100 days
      date.setTime(date.getTime() + expireMs);
      document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`;

    }
  };

  // usePersistLocaleCookie();


  return (
    <header className={styles.Header}>
      <Head>
        <title>{t("headTitle")}</title>
        <meta name="description" content={t("headMeta")} />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>

      </Head>

      <div className={styles.topBar}>
        <div className={styles.socialIcons}>
          <SocialIcon imagePath="/images/IG_Icon.png" linkUrl="https://instagram.com/" imgAlt="Instagram" width={22} height={22} />
          <SocialIcon imagePath="/images/FB_Icon.png" linkUrl="https://facebook.com/" imgAlt="Facebook" width={22} height={22} />
        </div>
        <Link href={asPath} locale={lang === "en" ? "ua" : "en"} lang={lang}>
          <a className={styles.languageButton}>
            {lang === "en" ? "UA" : "EN"}
          </a>
        </Link>
      </div>
      <div className={styles.headerBar}>
        <div className={styles.logoIcon}>
          <Link href="/">
            <Image src={"/images/logo.png"} alt="Logo" width={255} height={85} />
          </Link>
        </div>
        <div className={styles.mainMenu}>
          <Link href={"/news"}>
            <a className={asPath.startsWith("/news") ? `${styles.active}` : ""}>{t("menuNews")}</a>
          </Link>
          <Link href={"/services"}>
            <a className={asPath.startsWith("/services") ? `${styles.active}` : ""}>{t("menuServices")}</a>
          </Link>
          <Link href={"/staff"}>
            <a className={asPath.startsWith("/staff") ? `${styles.active}` : ""}>{t("menuStaff")}</a>
          </Link>
          <Link href={"/about"}>
            <a className={asPath.startsWith("/about") ? `${styles.active}` : ""}>{t("menuAbout")}</a>
          </Link>
          <Link href={"/contacts"}>
            <a className={asPath.startsWith("/contacts") ? `${styles.active}` : ""}>{t("menuContacts")}</a>
          </Link>
        </div>
        {
          isLoggedIn ? (
            <div className={styles.userCabinet}>
              <Link href="/cabinet">
                <a className={asPath.startsWith("/cabinet") ? `${styles.active}` : ""}>{t("userCabinet")}</a>
              </Link>
            </div>
          ) : (
            <div className={styles.logIn}>
              <Link href="/login">
                <a className={asPath.startsWith("/login") ? `${styles.active}` : ""}>{t("logIn")}</a>
              </Link>
            </div>
          )
        }
      </div>
      <div className={styles.line}></div>
    </header>
  );
};

export default Header;