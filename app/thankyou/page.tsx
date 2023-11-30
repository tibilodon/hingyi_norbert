import styles from "./page.module.css";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Köszönöm - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  metadataBase: new URL("https://hingyi-norbert.vercel.app/api/og"),
  openGraph: {
    title: "Köszönöm - Burkoló | Hingyi Norbert",
    description: "Hingyi Norbert - Burkoló oldala",
    images: [
      {
        url: "https://hingyi-norbert.vercel.app/api/og",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ThankYou() {
  return (
    <>
      <div className={styles.wrap}>
        <h1>Köszönöm!</h1>
        <h3>Levelére hamarosan válaszolni fogok.</h3>
      </div>
    </>
  );
}
