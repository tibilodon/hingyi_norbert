import styles from "./page.module.css";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rólam - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
};
export default function About() {
  return (
    <>
      <div className={styles.wrap}>about</div>
    </>
  );
}
