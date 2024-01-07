import styles from "./page.module.css";
import ButtonHome from "@/components/buttons/home/ButtonHome";
import contact from "@/public/contact.svg";
import mail from "@/public/mail.svg";
import black_phone from "@/public/black_phone.svg";
import Banner from "@/components/banner/Banner";
import Loading from "./loading";

import { Metadata } from "next";
import { supaCreateServerComponentClient } from "@/utils/supabaseClient";

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

export default async function Home() {
  const supabase = await supaCreateServerComponentClient();
  const { data: data } = await supabase.from("Home").select();

  if (!data) {
    return <Loading />;
  }

  const {
    name,
    profession,
    btn1,
    phoneNumber,
    btn3,
    line1_1,
    line1_2,
    line1_3,
    line1_4,
    color,
    imgName,
  } = data[0];
  const wrapBackground: React.CSSProperties = {
    background: `rgba(0, 0, 0, 0.2) url(${imgName})`,
    backgroundSize: "cover",
    backgroundBlendMode: "darken",
  };

  return (
    <>
      <div className={styles.wideWrap}>
        <div className={styles.wrap} style={wrapBackground}>
          {/* <h2>{name}</h2> */}
          <h2>{name}</h2>
          <h1 style={{ borderLeft: `8px solid ${color}` }}>{profession}</h1>
          <div className={styles.btns}>
            <ButtonHome
              img={contact}
              label={btn1}
              path="/contact"
              outline={true}
              color={color}
            />
            <a href={`tel:${phoneNumber}`}>
              <ButtonHome
                img={black_phone}
                label={phoneNumber}
                outline={false}
              />
            </a>

            {/*TODO: add template text*/}
            <ButtonHome
              img={mail}
              label={btn3}
              path="/contact"
              outline={false}
            />
          </div>

          <strong>{line1_1}</strong>
          <ul>
            <li>{line1_2}</li>
            <li>{line1_3}</li>
            <li>{line1_4}</li>
          </ul>
        </div>

        <span className={styles.banner}>
          <Banner data={data} />
        </span>
      </div>
      {/* <Footer /> */}
    </>
  );
}
