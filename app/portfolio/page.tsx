import styles from "./page.module.css";
import bath_ext from "@/public/bathroom_ext.jpg";
import toilet_new from "@/public/toilet_new.jpg";
import shower_new from "@/public/shower_reno.jpg";

import ImgModal from "@/components/imgModal/ImgModal";
import Divider from "@/components/divider/Divider";
import { supaCreateServerComponentClient } from "@/utils/supabaseClient";
import Loading from "../loading";

import { Metadata } from "next";
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

export default async function Portfolio() {
  const supabase = await supaCreateServerComponentClient();
  const { data: data } = await supabase.from("Portfolio").select();

  if (!data) {
    return <Loading />;
  }

  const { id, hero, description } = data[0];
  const { data: imgData } = await supabase
    .from("Portfolio_Images")
    .select()
    .match({ table_id: id });

  const imgArrData: string[] = [];
  const descArrData: string[] = [];
  imgData?.forEach((el) => {
    imgArrData.push(el.image!!);
    descArrData.push(el.description!!);
  });
  // console.log("arrDatra", descArrData);
  // const imgArr: string[] = [];
  // // const imgArr: string[] = [bath_ext.src, toilet_new.src, shower_new.src];
  // const descArr: string[] = [
  //   "Fürdőszoba bővítés",
  //   "Mellékhelyiség kialakítása",
  //   "Fürdőszoba felújítás",
  // ];
  return (
    <>
      <div className={styles.wrap}>
        <span>
          <h1>{hero}</h1>
          <Divider />
          <p>{description}</p>
        </span>

        <ImgModal imgArr={imgArrData} descArr={descArrData} />
      </div>
    </>
  );
}
