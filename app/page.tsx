import styles from "./page.module.css";
import ButtonHome from "@/components/buttons/home/ButtonHome";
import contact from "@/public/contact.svg";
import mail from "@/public/mail.svg";
import black_phone from "@/public/black_phone.svg";
import Banner from "@/components/banner/Banner";
import Loading from "./loading";

import { Metadata } from "next";
import Footer from "@/components/footer/Footer";
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
  const { data: image } = supabase.storage
    .from("images")
    .getPublicUrl("landing");

  console.log(image);

  const wrapBackground: React.CSSProperties = {
    background: `rgba(0, 0, 0, 0.2) url(${image.publicUrl})`,
  };
  //add type

  // const resp = await getTest();
  // if (Array.isArray(resp)) {
  //   const { name, email, phone } = resp[0];

  if (!data || !image) {
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
    // //banner
    // banner_hero,
    // bannerBox_1_label,
    // bannerBox_1_text,
    // bannerBox_2_label,
    // bannerBox_2_text,
    // bannerBox_3_label,
    // bannerBox_3_text,
    // bannerBox_4_label,
    // bannerBox_4_text,
  } = data[0];
  return (
    <>
      <div className={styles.wideWrap}>
        <div className={styles.wrap} style={wrapBackground}>
          {/* <h2>{name}</h2> */}
          <h2>{name}</h2>
          <h1>{profession}</h1>
          <div className={styles.btns}>
            <ButtonHome
              img={contact}
              label={btn1}
              path="/contact"
              outline={true}
            />
            <a href={`tel:${phoneNumber}`}>
              <ButtonHome
                img={black_phone}
                label={phoneNumber}
                outline={false}
              />
            </a>

            {/*TODO:links to email app, highly inconvenient - nav to contact form and add template text*/}
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
      <Footer />
    </>
  );
  // } else {
  //   // Handle error response here
  //   const msg = "error occured";
  //   console.log("Error response-----------------------------:", resp);
  //   return <Loading />;
  // }
}
