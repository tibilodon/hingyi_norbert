import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import LoginForm from "@/components/_login/loginForm/LoginForm";
import Link from "next/link";
export default async function Unauthenticated() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/cms/login/profile");
  }
  return (
    <>
      <div className={styles.wrap}>
        <h1>Bejelentkezés szükséges!</h1>
        <LoginForm />
        <Link className={styles.reset} href={"/cms/login/reset"}>
          <h1>Elfelejtett jelszó</h1>
        </Link>
      </div>
    </>
  );
}
