/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Script from "next/script";
import { useSession } from "next-auth/react";

import SocialIcon from "./SocialIcon";

import styles from "../styles/Header.module.css";

const Header: NextPage = () => {
  const { t, lang } = useTranslation("common");
  const { asPath } = useRouter();
  const { data: session, status } = useSession();

  return (
    <header className={styles.Header}>
      <Script src="https://kit.fontawesome.com/7ef186bda4.js" crossOrigin="anonymous"></Script>
      <Head>
        <title>{t("headTitle")}</title>
        <meta name="description" content={t("headMeta")} />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
        <link href="/dist/output.css" rel="stylesheet"></link>
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
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className={styles.dropMenu} as={"a"}>
              <FontAwesomeIcon icon={faArrowDown} className="ml-2 -mr-1 h-5 w-5 text-black" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className={`absolute right-0 mt-2 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 ${styles.dropButtons}`}>
                <Menu.Item>
                  <Link href={"/services/massage"}>
                    <a>{t("menuDropdownMassage")}</a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href={"/services/nails"}>
                    <a>{t("menuDropdownNails")}</a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href={"/services/cosmetology"}>
                    <a>{t("menuDropdownCosmetology")}</a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href={"/services/hair"}>
                    <a>{t("menuDropdownHair")}</a>
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          <Link href={"/staff"}>
            <a className={asPath.startsWith("/staff") ? `${styles.active}` : ""}>{t("menuStaff")}</a>
          </Link>
          <Link href={"/about"}>
            <a className={asPath.startsWith("/about") ? `${styles.active}` : ""}>{t("menuAbout")}</a>
          </Link>
          <Link href={"/contacts"}>
            <a className={asPath.startsWith("/contacts") ? `${styles.active}` : ""}>{t("menuContacts")}</a>
          </Link>
          {
            status === "authenticated" ? (
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
      </div>
      <div className={styles.line}></div>
    </header>
  );
};

export default Header;