import type { NextPage } from "next";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Home.module.css";

interface Props {
	children?: React.ReactNode;
}

const Context: NextPage<Props> = ({ children }) => {
  return (
    <div id={styles.container}>
      <Header />
      {children}
      <div className={styles.line}></div>
      <Footer />
    </div>
  );
};

export default Context;