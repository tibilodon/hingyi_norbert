import styles from "./page.module.css";
import ButtonHome from "@/components/buttons/home/ButtonHome";
import contact from "@/public/contact.svg";
import mail from "@/public/mail.svg";
import black_phone from "@/public/black_phone.svg";
import Banner from "@/components/banner/Banner";

import { Metadata } from "next";
import Footer from "@/components/footer/Footer";
export const metadata: Metadata = {
  title: "Burkoló - Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  metadataBase: new URL("https://hingyi-norbert.vercel.app/api/og"),
  openGraph: {
    title: "Burkoló - Hingyi Norbert",
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

export default function Home() {
  const phoneNum = "06 30 716 9769";

  return (
    <>
      <div className={styles.wideWrap}>
        <div className={styles.wrap}>
          <h2>Hingyi Norbert</h2>
          <h1>Burkoló</h1>
          <div className={styles.btns}>
            <ButtonHome
              img={contact}
              label="Kapcsolat"
              path="/contact"
              outline={true}
            />
            <a href={`tel:${phoneNum}`}>
              <ButtonHome img={black_phone} label={phoneNum} outline={false} />
            </a>

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

        <span className={styles.banner}>
          <Banner />
        </span>
      </div>
      <Footer />
    </>
  );
}
