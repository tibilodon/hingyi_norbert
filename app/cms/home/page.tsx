import styles from "./page.module.css";
import HomeCMS from "@/components/CMS/home/HomeCMS";
import {
  supaCreateServerComponentClient,
  supaServerComponentClientSession,
} from "@/utils/supabaseClient";
import { redirect } from "next/navigation";

export default async function CMSHome() {
  const supabase = await supaCreateServerComponentClient();
  const session = await supaServerComponentClientSession();
  const { data: data } = await supabase
    .from("Home")
    .select()
    //select based on criteria:
    .match({ user_id: session?.user.id });

  console.log(data);

  // const { data: owner } = await supabase
  //   .from("Owner")
  //   .select()
  //   //select based on criteria:
  //   .match({ is_complete: false });

  if (!session) {
    redirect("/unauthenticated");
  }
  return (
    <>
      <HomeCMS data={data} />
    </>
  );
}
