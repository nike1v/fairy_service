import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { signOut, useSession } from "next-auth/react";
import Context from "../components";
import styles from "../styles/About.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { t } = useTranslation("about");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const signOutButton = () => {
    signOut();
  }; 

  return (
    <Context>
      <main className={styles.container}>
        <button onClick={signOutButton}>Sign out</button>
      </main>
    </Context>
  );
};

export default Home;
