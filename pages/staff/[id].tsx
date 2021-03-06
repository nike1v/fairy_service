import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useState } from "react";
import Context from "../../components";
import styles from "../../styles/StaffMember.module.css";

const pages = ["1", "2", "3", "4", "5", "6"];

export async function getStaticPaths({ locales }: any) {
  const paths: { params: { id: string }, locale: string }[] = [];

  locales.forEach((locale: string) => {
    pages.forEach((id: string) => {
      paths.push({ params: { id }, locale });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: any) {
  return {
    props: {
      params,
    },
  };
};

interface Props {
  params: {
    id: string;
  };
}

const Home: NextPage<Props> = ({ params }) => {
  const { t } = useTranslation("staff");
  const { data: session, status } = useSession();

  const certificateHandler = () => {
    switch (params.id) {
    case "5":
      return "https://drive.google.com/file/d/1SNVK2kAZW0sH-JDqv-yakjNh94834sOy/view?usp=sharing";

    case "2":
    case "4":
      return "https://drive.google.com/file/d/1iGGTKGA4u8HMPq0xunGJqH3K_RQKmNDw/view?usp=sharing";

    case "1":
      return "https://drive.google.com/file/d/1aNGIS5H7tAZS4C1lRQnoibGxAZqVf35M/view?usp=sharing";

    case "3":
    case "6":
      return "https://drive.google.com/file/d/1-z1Hp53eozVugim_hqSpCVgTU-uTQK1a/view?usp=sharing";
    
    default:
      return "/";
    }
  };

  const bookingLinkHandler = () => {
    if (status === "authenticated") {
      switch(params.id) {
      case "1": 
        return "https://ua.fresha.com/book-now/charivnicya-s8p6730s/services?lid=698448&eid=1868611&pId=655824";
      case "2": 
        return "https://ua.fresha.com/book-now/charivnicya-s8p6730s/services?lid=698448&eid=1868613&pId=655824";
      case "3": 
        return "https://ua.fresha.com/book-now/charivnicya-s8p6730s/services?lid=698448&eid=1868651&pId=655824";
      case "4": 
        return "https://ua.fresha.com/book-now/charivnicya-s8p6730s/services?lid=698448&eid=1868653&pId=655824";
      case "5": 
        return "https://ua.fresha.com/book-now/charivnicya-s8p6730s/services?lid=698448&eid=1868654&pId=655824";
      case "6": 
        return "https://ua.fresha.com/book-now/charivnicya-s8p6730s/services?lid=698448&eid=1868656&pId=655824";
      }
    } else {
      return "/login?error=unauth";
    }
  };

  const handleOrderButton = () => {
    if (status === "authenticated") {
      return;
    } else {
      return "/login?error=unauth";
    }
  };

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.staffPhoto}>
          <Image src={`/images/staff_${params.id}.png`} alt={params.id} width={500} height={450} />
        </div>
        <div className={styles.staffDescr}>
          <div className={styles.staffName}>
            {t("staffName" + params.id)}
          </div>
          <div className={styles.staffJob}>
            {t("staffJob" + params.id)}
          </div>
          <div className={styles.staffTeam}>
            {t("staffTeam" + params.id)}
          </div>
          <div className={styles.staffExp}>
            {t("staffExp" + params.id)}
          </div>
          <div className={styles.staffButtons}>
            <div className={styles.staffCertificates}>
              <a href={certificateHandler()} target="_blank" rel="noreferrer" >{t("staffCertificates")}</a>
            </div>
            <div className={styles.staffSignUp} onClick={handleOrderButton}>
              <a href={bookingLinkHandler()} target={status === "authenticated" ? "_blank" : "_self"} rel="noreferrer">{t("staffSignUp")}</a>
            </div>
          </div>
        </div>
      </main>
    </Context>
  );
};

export default Home;
