import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import Context from "../../components";
import styles from "../../styles/Service.module.css";

const pages = ["massage", "nails", "cosmetology", "hair"];

export async function getStaticPaths({ locales }: any) {
  const paths: { params: { name: string }, locale: string }[] = [];

  locales.forEach((locale: string) => {
    pages.forEach((name: string) => {
      paths.push({ params: { name }, locale });
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
    name: string;
  };
}

const Home: NextPage<Props> = ({ params }) => {
  const serviceName = params.name.charAt(0).toUpperCase() + params.name.slice(1);
  const { t } = useTranslation("services");

  return (
    <Context>
      <main className={styles.serviceContainer}>
        <div className={styles.serviceBlock}>
          <div className={styles.serviceImage}>
            <Image src={`/images/${params.name}.png`} layout="responsive" width={"100%"} height={"100%"} alt={"massage"} />
          </div>
          <div className={styles.serviceDescription}>
            <div className={styles.serviceName}>
              {t("serviceName"+serviceName)}
            </div>
            <div className={styles.serviceInfo}>
              <div className={styles.serviceLyrics}>
                {t("serviceLyric"+serviceName)}
              </div>
              <div>
                {t("serviceDescription"+serviceName)}
                <ul>{t("serviceDescriptionList"+serviceName).split(", ").map((el: any) => (
                  <li key={el}>
                    {el}
                  </li>
                ))}</ul>
              </div>
              <div className={styles.serviceButton}>
                <Link href={"/staff"+`?field=${params.name}`}>
                  {t("serviceButton")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Context>
  );
};

export default Home;
