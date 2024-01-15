//  post call to /api/reset
import styles from "./page.module.css";

import { redirect } from "next/navigation";
import { supaServerComponentClientSession } from "@/utils/supabaseClient";
import ResetForm from "@/components/_login/resetForm/ResetForm";
import Link from "next/link";
export default async function Reset() {
  const session = await supaServerComponentClientSession();

  if (session) {
    redirect("/cms/login/profile");
  }

  return (
    <>
      <div className={styles.wrap}>
        <ResetForm />
      </div>
    </>
  );
}
