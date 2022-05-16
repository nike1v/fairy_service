import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Context from "../components";
import styles from "../styles/Staff.module.css";

const Home: NextPage = () => {
  const { t } = useTranslation("staff");
  const [imageClass, setImageClass] = useState("");

  const handleHoverServiceName = (event: any) => {
    event.stopPropagation();
    // TODO add effects to images
    console.log(event.target);
    setImageClass((prev) => prev ? "" : "activeService");
  };

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.header}>
          {t("header")}
        </div>
        <div className={styles.staffGrid}>
          <div className={styles.staffLineOne}>
            <Link href={"/staff/1"}>
              <div>
                <Image src={"/images/staff_1.png"} width={200} height={170} alt={"staff"} />
                {t("masterOneName")}
                <br />
                {t("masterOneJob")}
              </div>
            </Link>
            <Link href={"/staff/2"}>
              <div>
                <Image src={"/images/staff_2.png"} width={200} height={170} alt={"staff"} />
                {t("masterTwoName")}
                <br />
                {t("masterTwoJob")}
              </div>
            </Link>
            <Link href={"/staff/3"}>
              <div>
                <Image src={"/images/staff_3.png"} width={200} height={170} alt={"staff"} />
                {t("masterThreeName")}
                <br />
                {t("masterThreeJob")}
              </div>
            </Link>
          </div>
          <div className={styles.staffLineTwo}>
            <Link href={"/staff/4"}>
              <div>
                <Image src={"/images/staff_4.png"} width={200} height={170} alt={"staff"} />
                {t("masterFourName")}
                <br />
                {t("masterFourJob")}
              </div>
            </Link>
            <Link href={"/staff/5"}>
              <div>
                <Image src={"/images/staff_5.png"} width={200} height={170} alt={"staff"} />
                {t("masterFiveName")}
                <br />
                {t("masterFiveJob")}
              </div>
            </Link>
            <Link href={"/staff/6"}>
              <div>
                <Image src={"/images/staff_6.png"} width={200} height={170} alt={"staff"} />
                {t("masterSixName")}
                <br />
                {t("masterSixJob")}
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Context>
  );
};

export default Home;
