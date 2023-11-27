import InputForm from "@/components/formInput/inputForm/InputForm";
import styles from "./page.module.css";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kapcsolat - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
};
export default async function Contact() {
  return (
    <>
      <div className={styles.wrap}>
        <h2>Ajánlatok kérése & kapcsolatfelvétel</h2>
        <InputForm />
      </div>
    </>
  );
}
