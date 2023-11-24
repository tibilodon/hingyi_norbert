import styles from "./page.module.css";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kapcsolat - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
};
export default function Contact() {
  return (
    <>
      <div className={styles.wrap}>Contact</div>
    </>
  );
}
