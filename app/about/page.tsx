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
import Footer from "@/components/footer/Footer";
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
              <p>
                ✅ Számlaképes szolgáltatóként teljes körű pénzügyi
                átláthatóságot biztosítok ügyfeleimnek.
              </p>
              <p>
                ✅ Minden munkát korszerű technológiával végzek, amely hosszú
                élettartamot és esztétikus kivitelezést garantál.
              </p>
              <p>
                ✅ Naprakész vagyok az új hidegburkolási anyagok és trendek
                terén, így Ön mindig a legjobbat kapja tőlem.
              </p>
              <p>
                ✅ Igényességem és precizitásom garanciát nyújt arra, hogy a
                munkám minden részletében elégedett lesz.
              </p>
            </span>
            <h2>Szolgáltatásaim</h2>
            <span className={styles.contnet}>
              <p>🏡 Lakossági és kereskedelmi hidegburkolás </p>
              <p>🏢 Fürdőszoba és konyha felújítás</p>
              <p>🏘️ Teraszok és kültéri burkolás</p>
              <p>🚿 Zuhanykabin és csempézés</p>
              <p>💼 Üzletek és irodák burkolása</p>
            </span>
          </span>
        </div>
        <WorkCard
          header="Új lakások és házak"
          img={brandNew.src}
          list={fromScratch}
        />
        <WorkCard header="Renováció" img={reno.src} list={repair} />
      </div>
      {/* <div className={styles.quote}>
        <h2>Ingyenes árajánlatot szeretnék</h2>
        <Link className={styles.contact} href={"/contact"}>
          <RegularButton label="Árajánlatot kérek" />
        </Link>
      </div> */}
      <Footer />
    </>
  );
}
