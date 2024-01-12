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

  if (!session) {
    redirect("/unauthenticated");
  }
  const user = session.user.id;
  return (
    <>
      <HomeCMS data={data} user={user} />
    </>
  );
}
