import styles from "./page.module.css";
import {
  supaCreateServerComponentClient,
  supaServerComponentClientSession,
} from "@/utils/supabaseClient";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";
import AboutCMS from "@/components/CMS/about/AboutCMS";

export default async function CMSAbout() {
  const supabase = await supaCreateServerComponentClient();
  const session = await supaServerComponentClientSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  //  fetch data
  const { data: aboutData } = await supabase
    .from("About")
    .select()
    .match({ user_id: session?.user.id });

  if (!aboutData) {
    return <Loading />;
  }
  const user = session.user.id;
  //  about table
  const { id } = aboutData[0];

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

  return (
    <>
      <AboutCMS
        userId={user}
        aboutData={aboutData[0]}
        lowerContent={lowerContent}
        upperContent={upperContent}
        card_1_data={cardData}
        card_2_data={secondCardData}
      />
    </>
  );
}
