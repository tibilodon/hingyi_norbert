import styles from "./page.module.css";
import type { Metadata } from "next";
import Image from "next/image";
import headshot from "@/public/about_headshot.svg";
import Divider from "@/components/divider/Divider";
import WorkCard from "@/components/workCard/WorkCard";
import reno from "@/public/renovation.jpg";
import brandNew from "@/public/new.jpg";

export const metadata: Metadata = {
  title: "Rólam - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
};
export default function About() {
  const repair = ["Felújítás", "Átalakítás", "Felületek javítása"];
  const fromScratch = ["Új helyiségek", "Bővített területek"];
  return (
    <>
      <div className={styles.wrap}>
        <h1>Hingyi Norbert</h1>
        <span>Burkoló</span>
        <Divider />
        <Image
          className={styles.img}
          src={headshot}
          alt="head shot image"
          width={200}
        />
        <div className={styles.content}>
          <strong>Hingyi Norbertről</strong>
          <p>
            Hingyi Norbert egy burkoló aki Budapesten él. Szakmájában 2020 óta
            dolgozik, amely idő alatt számtalan projekten keresztül sokrétű
            tapasztalatra tett szert.
          </p>
        </div>
        <div className={styles.content}>
          <strong>Képesítés</strong>
          <p>
            Akkreditált képzését 2019-ben szerezte, amely elvégzése után egy
            évig gyakornokként szolgált az <strong>XYZ cégnél</strong>,
            tapasztalatszerzés céljából. A képzés és a gyakornokság időtartama
            alatt nemcsak az általános, de a dekoratív burkolást is sikerült
            elsajátítania.
          </p>
        </div>
        <WorkCard
          header="Új lakások és házak"
          img={brandNew.src}
          list={fromScratch}
        />
        <WorkCard header="Renováció" img={reno.src} list={repair} />
      </div>
    </>
  );
}
