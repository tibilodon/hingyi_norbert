import styles from "./page.module.css";
import {
  supaCreateServerComponentClient,
  supaServerComponentClientSession,
} from "@/utils/supabaseClient";
import { redirect } from "next/navigation";

export default async function CMSAbout() {
  return (
    <>
      <h1>cms about</h1>
    </>
  );
}
