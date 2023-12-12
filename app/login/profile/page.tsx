import styles from "./page.module.css";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supaServerComponentClientSession } from "@/utils/supabaseClient";
import LoginWrap from "@/components/_login/wrap/LoginWrap";
import LogoutButton from "@/components/buttons/logout/LogoutButton";
export default async function Profile() {
  const session = await supaServerComponentClientSession();
  if (!session) {
    redirect("/unauthenticated");
  }

  return (
    <>
      <div className={styles.wrap}>
        <LoginWrap>
          <h1>hello {session.user.email}</h1>
          <h1>You are logged in!</h1>
          <Link href={"/cms"}>
            <button>proceed to cms</button>
          </Link>
          <LogoutButton />
        </LoginWrap>
      </div>
    </>
  );
}
