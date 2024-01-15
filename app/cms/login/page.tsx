//  post call to /api/login
import styles from "./page.module.css";

import { redirect } from "next/navigation";
import LoginForm from "@/components/_login/loginForm/LoginForm";
import { supaServerComponentClientSession } from "@/utils/supabaseClient";
import ResetForm from "@/components/_login/resetForm/ResetForm";
import Link from "next/link";
export default async function Login() {
  const session = await supaServerComponentClientSession();

  if (session) {
    redirect("/cms/login/profile");
  }

  return (
    <>
      <div className={styles.wrap}>
        <LoginForm />
        <Link className={styles.reset} href={"/cms/login/reset"}>
          <h1>Elfelejtett jelszó</h1>
        </Link>
      </div>
    </>
  );
}
