import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Context from "../components";
import styles from "../styles/Staff.module.css";

type staffInfoType = {
  link: string,
  imageSrc: string,
  imageAlt: string,
  name: string,
  job: string,
  field: string,
}

const staffInfo = [
  {
    link: "/staff/1",
    imageSrc: "/images/staff_1.png",
    imageAlt: "staff",
    name: "masterOneName",
    job: "masterOneJob",
    field: "massage"
  },
  {
    link: "/staff/2",
    imageSrc: "/images/staff_2.png",
    imageAlt: "staff",
    name: "masterTwoName",
    job: "masterTwoJob",
    field: "hair"
  },
  {
    link: "/staff/3",
    imageSrc: "/images/staff_3.png",
    imageAlt: "staff",
    name: "masterThreeName",
    job: "masterThreeJob",
    field: "nails"
  },
  {
    link: "/staff/4",
    imageSrc: "/images/staff_4.png",
    imageAlt: "staff",
    name: "masterFourName",
    job: "masterFourJob",
    field: "hair"
  },
  {
    link: "/staff/5",
    imageSrc: "/images/staff_5.png",
    imageAlt: "staff",
    name: "masterFiveName",
    job: "masterFiveJob",
    field: "cosmetology"
  },
  {
    link: "/staff/6",
    imageSrc: "/images/staff_6.png",
    imageAlt: "staff",
    name: "masterSixName",
    job: "masterSixJob",
    field: "nails"
  }
];

const Home: NextPage = () => {
  const { t } = useTranslation("staff");
  const router = useRouter();
  let filteredStaff = staffInfo;
  if (router.query.field) {
    filteredStaff = staffInfo.filter((staff: staffInfoType) => staff.field === router.query.field);
  }

  return (
    <Context>
      <main className={styles.container}>
        <div className={styles.header}>
          {t("header")}
        </div>
        <div className={styles.staffGrid}>
          {
            filteredStaff.map((staff: staffInfoType) => (
              <Link href={staff.link} key={staff.name}>
                <div className={styles.staffBox}>
                  <Image src={staff.imageSrc} width={200} height={170} alt={staff.imageAlt} />
                  {t(staff.name)}
                  <br />
                  {t(staff.job)}
                </div>
              </Link>
            ))
          }
        </div>
      </main>
    </Context>
  );
};

export default Home;
