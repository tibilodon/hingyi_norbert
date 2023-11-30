import styles from "./page.module.css";
import ErrorContent from "@/components/error/ErrorContent";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hiba történt | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  metadataBase: new URL("https://hingyi-norbert.vercel.app/api/og"),
  openGraph: {
    title: "Hiba történt | Hingyi Norbert",
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
export default function Error() {
  return (
    <>
      <ErrorContent />
    </>
  );
}
