//  post call to /api/login
import styles from "./page.module.css";

import { redirect } from "next/navigation";
import LoginForm from "@/components/_login/loginForm/LoginForm";
import { supaServerComponentClientSession } from "@/utils/supabaseClient";
export default async function Login() {
  const session = await supaServerComponentClientSession();

  if (session) {
    redirect("/cms/login/profile");
  }

  return (
    <>
      <div className={styles.wrap}>
        <LoginForm />
      </div>
    </>
  );
}
