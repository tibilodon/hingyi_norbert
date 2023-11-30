import InputForm from "@/components/formInput/inputForm/InputForm";
import styles from "./page.module.css";
import Divider from "@/components/divider/Divider";

// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Kapcsolat - Burkoló | Hingyi Norbert",
//   description: "Hingyi Norbert - Burkoló oldala",
// };

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kapcsolat - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  metadataBase: new URL("https://hingyi-norbert.vercel.app/api/og"),
  openGraph: {
    title: "Kapcsolat - Burkoló | Hingyi Norbert",
    description: "Hingyi Norbert - Burkoló oldala",
    images: [
      {
        url: "https://hingyi-norbert.vercel.app/api/og",
        width: 1200,
        height: 630,
        // alt: "hello",
      },
    ],
  },
};
export default async function Contact() {
  const other = `Az ingyenes árajánlat érdekében (illetve ha kérdése van) kérjük, töltse ki az alábbi űrlapot`;
  return (
    <>
      <div className={styles.wrap}>
        <h2>Ajánlatok kérése & kapcsolatfelvétel</h2>
        <Divider />
        <h4>{other}</h4>
        <div className={styles.form}>
          <InputForm />
        </div>
      </div>
    </>
  );
}
