import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import TestForm from "../test/TestForm";
import Login from "../login/page";

export default async function Unauthenticated() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/supatest/read");
  }
  return (
    <>
      <div className={styles.wrap}>
        <h1>please sign in!!!4</h1>
        {/* <TestForm /> */}
        <Login />
      </div>
    </>
  );
}
