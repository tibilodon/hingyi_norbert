import InputForm from "@/components/formInput/inputForm/InputForm";
import styles from "./page.module.css";
import Divider from "@/components/divider/Divider";
import Loading from "../loading";
import { supaCreateServerComponentClient } from "@/utils/supabaseClient";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Kapcsolat - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  metadataBase: new URL("https://hingyi-norbert.vercel.app/api/og"),
  openGraph: {
    title: "Kapcsolat - Burkoló | Hingyi Norbert",
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

export default async function Contact() {
  const supabase = await supaCreateServerComponentClient();
  const { data: data } = await supabase.from("Contact").select();

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <div className={styles.wrap}>
        <h2>{data[0].hero}</h2>
        <Divider />
        <h4>{data[0].description}</h4>
        <div className={styles.form}>
          <InputForm />
        </div>
      </div>
    </>
  );
}
