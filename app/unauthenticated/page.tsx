import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import LoginForm from "@/components/_login/loginForm/LoginForm";
export default async function Unauthenticated() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/test");
  }
  return (
    <>
      <div className={styles.wrap}>
        <h1>please sign in!!!4</h1>
        <LoginForm />
      </div>
    </>
  );
}
