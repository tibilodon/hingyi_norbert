import ContactCMS from "@/components/CMS/contact/ContactCMS";
import styles from "./page.module.css";
import Loading from "@/app/loading";
import {
  supaCreateServerComponentClient,
  supaServerComponentClientSession,
} from "@/utils/supabaseClient";
import { redirect } from "next/navigation";

export default async function CMSContact() {
  const supabase = await supaCreateServerComponentClient();
  const session = await supaServerComponentClientSession();
  const { data: data } = await supabase
    .from("Contact")
    .select()
    //select based on criteria:
    .match({ user_id: session?.user.id });

  if (!session) {
    redirect("/unauthenticated");
  }
  const user = session.user.id;

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <div className={styles.wrap}>
        <ContactCMS data={data} user={user} />
      </div>
    </>
  );
}
