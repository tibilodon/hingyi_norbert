import styles from "./page.module.css";
import PortfolioCMS from "@/components/CMS/portfolio/PortfolioCMS";
import {
  supaCreateServerComponentClient,
  supaServerComponentClientSession,
} from "@/utils/supabaseClient";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";

export default async function CMSPortfolio() {
  const supabase = await supaCreateServerComponentClient();
  const session = await supaServerComponentClientSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  const { data: data } = await supabase.from("Portfolio").select();

  if (!data) {
    return <Loading />;
  }

  const { id } = data[0];
  const { data: imgData } = await supabase
    .from("Portfolio_Images")
    .select()
    .match({ table_id: id });

  const user = session.user.id;

  return (
    <>
      <div className={styles.wrap}>
        <PortfolioCMS data={data} imgData={imgData} user={user} />
      </div>
    </>
  );
}
