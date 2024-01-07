import styles from "./page.module.css";
import Image from "next/image";
import headshot from "@/public/about_headshot.svg";
import Divider from "@/components/divider/Divider";
import WorkCard from "@/components/workCard/WorkCard";
import reno from "@/public/renovation.jpg";
import brandNew from "@/public/new.jpg";
import { supaCreateServerComponentClient } from "@/utils/supabaseClient";
import Loading from "../loading";

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

export default async function About() {
  const supabase = await supaCreateServerComponentClient();
  //  main data
  const { data: aboutData } = await supabase.from("About").select();

  //  load barrier
  if (!aboutData) {
    return <Loading />;
  }

  //  deconstruct data and get table_id as well--
  const {
    id,
    name,
    profession,
    image,
    hero,
    work_card_1,
    work_card_2,
    strong_hero,
    strong_text,
    upper_content_hero,
    lower_content_hero,
    work_card_1_image,
    work_card_2_image,
  } = aboutData[0];

  //  about_content_lowers
  const { data: lowerContent } = await supabase
    .from("About_content_lowers")
    .select()
    .match({ table_id: id });

  //  about_content_uppers
  const { data: upperContent } = await supabase
    .from("About_content_uppers")
    .select()
    .match({ table_id: id });

  //  secondWorkCardContents
  const { data: secondCardData } = await supabase
    .from("SecondWorkCardContents")
    .select()
    .match({ table_id: id });

  //  workCardContents
  const { data: cardData } = await supabase
    .from("WorkCardContents")
    .select()
    .match({ table_id: id });

  //  load barrier
  if (!lowerContent || !upperContent || !secondCardData || !cardData) {
    return <Loading />;
  }

  const card_1_arr = cardData.map(({ text }) => text);

  const card_2_arr = secondCardData.map(({ text }) => text);

  return (
    <>
      <div className={styles.wrap}>
        <h1>{name}</h1>
        <span>{profession}</span>
        <Divider />
        <Image
          className={styles.img}
          src={image!!}
          alt="head shot image"
          width={200}
          height={200}
        />
        <div className={styles.content}>
          <span className={styles.newContent}>
            <h1>{hero}</h1>
            <h2>{strong_hero}</h2>
            <h4>{strong_text}</h4>
            <h2>{upper_content_hero}</h2>
            <span className={styles.content}>
              {/*TODO: MAP OUT CONTENT, INTRODUCE CLIENT COMPONENT, ADD "INSERT NEW LINE" FUNCTIONALITY*/}
              {upperContent.map(({ text }, i) => {
                return <p key={i}>{text}</p>;
              })}
            </span>
            <h2>{lower_content_hero}</h2>
            <span className={styles.contnet}>
              {/*TODO: MAP OUT CONTENT*/}
              {lowerContent.map(({ text }, i) => {
                return <p key={i}>{text}</p>;
              })}
            </span>
          </span>
        </div>
        {/*TODO: max 5 items other than the header*/}

        <WorkCard
          header={work_card_1!!}
          img={work_card_1_image!!}
          list={card_1_arr}
        />

        <WorkCard
          header={work_card_2!!}
          img={work_card_2_image!!}
          list={card_2_arr}
        />
      </div>
    </>
  );
}
