import MiscCMS from "@/components/CMS/misc/MiscCMS";
import styles from "./page.module.css";
import {
  supaCreateServerComponentClient,
  supaServerComponentClientSession,
} from "@/utils/supabaseClient";
import { redirect } from "next/navigation";

export default async function Misc() {
  const supabase = await supaCreateServerComponentClient();
  const session = await supaServerComponentClientSession();
  const { data: data } = await supabase
    .from("Miscellaneous")
    .select()
    //select based on criteria:
    .match({ user_id: session?.user.id });

  if (!session) {
    redirect("/unauthenticated");
  }

  return (
    <div className={styles.wrap}>
      <h1>hello misc</h1>
      <h1>THE ACTIVE MENU ITEM IS ALSO GETTING THE CHOSEN COLOR!!</h1>
      <MiscCMS session={session} data={data} />
    </div>
  );
}
