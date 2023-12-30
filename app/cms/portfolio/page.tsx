import styles from "./page.module.css";
import PortfolioCMS from "@/components/CMS/portfolio/PortfolioCMS";
import { supaCreateServerComponentClient } from "@/utils/supabaseClient";
import Loading from "@/app/loading";

export default async function CMSPortfolio() {
  const supabase = await supaCreateServerComponentClient();
  const { data: data } = await supabase.from("Portfolio").select();

  if (!data) {
    return <Loading />;
  }

  const { id } = data[0];
  const { data: imgData } = await supabase
    .from("Portfolio_Images")
    .select()
    .match({ table_id: id });

  return (
    <>
      <div className={styles.wrap}>
        <PortfolioCMS data={data} imgData={imgData} />
      </div>
    </>
  );
}
