import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Context from "../components";
import styles from "../styles/Services.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation("services");
  const [isMassage, setIsMassage] = useState(false);
  const [isNails, setIsNails] = useState(false);
  const [isCosmetology, setIsCosmetology] = useState(false);
  const [isHair, setIsHair] = useState(false);

  return (
    <Context>
      <main className={styles.servicesContainer}>
        <div className={styles.servicesBlock}>
          <div className={styles.servicesNames}>
            <span onMouseOver={() => setIsMassage(true)} onMouseOut={() => setIsMassage(false)}>
              <Link href={"/services/massage"}>
                {t("massage")}
              </Link>
            </span>
            <span onMouseOver={() => setIsNails(true)} onMouseOut={() => setIsNails(false)}>
              <Link href={"/services/nails"}>
                {t("nails")}
              </Link>
            </span>
            <span onMouseOver={() => setIsCosmetology(true)} onMouseOut={() => setIsCosmetology(false)}>
              <Link href={"/services/cosmetology"}>
                {t("cosmetology")}
              </Link>
            </span>
            <span onMouseOver={() => setIsHair(true)} onMouseOut={() => setIsHair(false)}>
              <Link href={"/services/hair"}>
                {t("hair")}
              </Link>
            </span>
          </div>
          <div className={styles.servicesPhotos}>
            <div>
              <div>
                <Image src={"/images/massage.png"} width={300} className={isMassage ? styles.noFilter : ""} height={300} alt={"massage"} />
              </div>
              <div>
                <Image src={"/images/nails.png"} width={300} className={isNails ? styles.noFilter : ""} height={300} alt={"massage"} />
              </div>
            </div>
            <div>
              <div>
                <Image src={"/images/cosmetology.png"} className={isCosmetology ? styles.noFilter : ""} width={300} height={300} alt={"massage"} />
              </div>
              <div>
                <Image src={"/images/hair.png"} width={300} className={isHair ? styles.noFilter : ""} height={300} alt={"massage"} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Context>
  );
};

export default Home;
