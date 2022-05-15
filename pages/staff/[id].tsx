import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
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
              <Link href={"/"}>
                <a>{t("staffCertificates")}</a>
              </Link>
            </div>
            <div className={styles.staffSignUp}>
              <Link href={"/services"}>
                <a>{t("staffSignUp")}</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Context>
  );
};

export default Home;
