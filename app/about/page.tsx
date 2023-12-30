import styles from "./page.module.css";
import Image from "next/image";
import headshot from "@/public/about_headshot.svg";
import Divider from "@/components/divider/Divider";
import WorkCard from "@/components/workCard/WorkCard";
import reno from "@/public/renovation.jpg";
import brandNew from "@/public/new.jpg";
import RegularButton from "@/components/buttons/regular/RegularButton";
import Link from "next/link";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rólam - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  metadataBase: new URL("https://hingyi-norbert.vercel.app/api/og"),
  openGraph: {
    title: "Rólam - Burkoló | Hingyi Norbert",
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

export default function About() {
  const testContent = [
    {
      text: `✅ Számlaképes szolgáltatóként teljes körű pénzügyi átláthatóságot
    biztosítok ügyfeleimnek.`,
    },

    {
      text: ` ✅ Minden munkát korszerű technológiával
    végzek, amely hosszú élettartamot és esztétikus kivitelezést
    garantál.`,
    },
    {
      text: ` ✅ Naprakész vagyok az új hidegburkolási anyagok és
    trendek terén, így Ön mindig a legjobbat kapja tőlem.`,
    },
    {
      text: `    ✅
 Igényességem és precizitásom garanciát nyújt arra, hogy a munkám
 minden részletében elégedett lesz.`,
    },
  ];

  const testOtherContent = [
    { text: ` 🏡 Lakossági és kereskedelmi hidegburkolás ` },
    { text: `  🏢 Fürdőszoba és konyha felújítás` },
    { text: `🏘️ Teraszok és kültéri burkolás` },
    { text: `🚿 Zuhanykabin és csempézés` },
    { text: `💼 Üzletek és irodák burkolása` },
  ];

  const repair = [
    "Felújítás",
    "Átalakítás",
    "Felületek javítása",
    "other item",
    "other item",
  ];
  const fromScratch = [
    "Új helyiségek",
    "Bővített területek",
    "other item",
    "other item",
    "other item",
  ];
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
          {/* <strong>Hingyi Norbertről</strong>
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
          </p> */}
          <span className={styles.newContent}>
            <h1>
              Professzionális Hidegburkolás Szolgáltatás Budapesten és Környékén
            </h1>
            <h2>🔨 Tisztelt Érdeklődő 🔨</h2>
            <h4>
              Üdvözölöm az adatlapomon, 4 éves tapasztalattal és szenvedéllyel
              végzek hidegburkolási munkákat Budapesten és környékén.
              Szolgáltatásaimra a minőség és a precizitás a legmagasabb
              prioritás.
            </h4>
            <h2>Miért válasszon engem?</h2>
            <span className={styles.content}>
              {/*TODO: MAP OUT CONTENT, INTRODUCE CLIENT COMPONENT, ADD "INSERT NEW LINE" FUNCTIONALITY*/}
              {testContent.map(({ text }, i) => {
                return <p key={i}>{text}</p>;
              })}
            </span>
            <h2>Szolgáltatásaim</h2>
            <span className={styles.contnet}>
              {/*TODO: MAP OUT CONTENT*/}
              {testOtherContent.map(({ text }, i) => {
                return <p key={i}>{text}</p>;
              })}
            </span>
          </span>
        </div>
        {/*TODO: max 5 items other than the header*/}
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
