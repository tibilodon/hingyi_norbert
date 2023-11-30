import styles from "./page.module.css";
import ButtonHome from "@/components/buttons/home/ButtonHome";
import contact from "@/public/contact.svg";
import mail from "@/public/mail.svg";
import black_phone from "@/public/black_phone.svg";
import Banner from "@/components/banner/Banner";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Burkoló - Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  openGraph: {
    title: "Hingyi Norbert | Burkoló",
    description: "Hingyi Norbert | Burkoló",
    // url: 'https://nextjs.org',
    // siteName: 'Next.js',
    images: [
      {
        url: "./opengraph-image.png",
        width: 800,
        height: 600,
      },
      {
        url: "./opengraph-image.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <div className={styles.wideWrap}>
        <div className={styles.wrap}>
          <div className={styles.content}>
            <h2>Hingyi Norbert</h2>
            <h1>Burkoló</h1>
            <div className={styles.btns}>
              <ButtonHome
                img={contact}
                label="Kapcsolat"
                path="/contact"
                outline={true}
              />
              <ButtonHome
                img={black_phone}
                label="06 20 123 4567"
                outline={false}
              />

              {/*TODO:links to email app, highly inconvenient - nav to contact form and add template text*/}
              <ButtonHome
                img={mail}
                label="Tervek és képek kérése"
                path="/contact"
                outline={false}
              />
            </div>

            <strong>
              Hingyi Norbert Pest megyei burkoló 5 év tapasztalattal.
            </strong>
            <ul>
              <li>Magán és céges megrendelőknek</li>
              <li>Bármilyen bonyolultságú és méretű felület burkolása</li>
              <li>Főként Budapesten és körzetében elérhető</li>
            </ul>
          </div>
        </div>

        <span className={styles.test}>
          <Banner />
        </span>
      </div>
    </>
  );
}
