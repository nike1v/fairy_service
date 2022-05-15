import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Context from "../components";
import styles from "../styles/Services.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation("services");
  const [imageClass, setImageClass] = useState("");

  const handleHoverServiceName = (event: any) => {
    event.stopPropagation();
    // TODO add effects to images
    console.log(event.target);
    setImageClass((prev) => prev ? "" : "activeService");
  };

  return (
    <Context>
      <main className={styles.servicesContainer}>
        <div className={styles.servicesBlock}>
          <div className={styles.servicesNames}>
            <span onMouseOver={handleHoverServiceName}>
              <Link href={"/services/massage"}>
                {t("massage")}
              </Link>
            </span>
            <span>
              <Link href={"/services/nails"}>
                {t("nails")}
              </Link>
            </span>
            <span>
              <Link href={"/services/cosmetology"}>
                {t("cosmetology")}
              </Link>
            </span>
            <span>
              <Link href={"/services/hair"}>
                {t("hair")}
              </Link>
            </span>
          </div>
          <div className={styles.servicesPhotos}>
            <div>
              <div className={styles.photoMassage}>
                <Image src={"/images/massage.png"} width={300} height={300} alt={"massage"} />
              </div>
              <div className={styles.photoNails}>
                <Image src={"/images/nails.png"} width={300} height={300} alt={"massage"} />
              </div>
            </div>
            <div>
              <div className={styles.photoCosmetology}>
                <Image src={"/images/cosmetology.png"} width={300} height={300} alt={"massage"} />
              </div>
              <div className={styles.photoHair}>
                <Image src={"/images/hair.png"} width={300} height={300} alt={"massage"} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Context>
  );
};

export default Home;
