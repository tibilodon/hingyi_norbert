import styles from "./page.module.css";
import bath_ext from "@/public/bathroom_ext.jpg";
import toilet_new from "@/public/toilet_new.jpg";
import shower_new from "@/public/shower_reno.jpg";

import ImgModal from "@/components/imgModal/ImgModal";
import Divider from "@/components/divider/Divider";
import RegularButton from "@/components/buttons/regular/RegularButton";
import Link from "next/link";

import { Metadata } from "next";
import Quote from "@/components/quote/Quote";
export const metadata: Metadata = {
  title: "Portfólió - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  metadataBase: new URL("https://hingyi-norbert.vercel.app/api/og"),
  openGraph: {
    title: "Portfólió - Burkoló | Hingyi Norbert",
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

export default function Portfolio() {
  const imgArr: string[] = [bath_ext.src, toilet_new.src, shower_new.src];
  const descArr: string[] = [
    "Fürdőszoba bővítés",
    "Mellékhelyiség kialakítása",
    "Fürdőszoba felújítás",
  ];
  return (
    <>
      <div className={styles.outer}>
        <div className={styles.wrap}>
          <span>
            <h1>Burkolói munkák</h1>
            <Divider />
            <p>
              A munkám során mindig a minőségre törekszem és arra, hogy az
              elkészült felület tökéletesen nézzen ki és időtálló legyen.
            </p>
          </span>

          <ImgModal imgArr={imgArr} descArr={descArr} />
        </div>
        <Quote />
      </div>
    </>
  );
}
