import styles from "./page.module.css";
import { supaServerComponentClientSession } from "@/utils/supabaseClient";
import { redirect } from "next/navigation";
import HomeTest from "../../components/CMS/home/HomeCMS";
import Link from "next/link";

export default async function Cms() {
  const session = await supaServerComponentClientSession();

  // const { data: owner } = await supabase
  //   .from("Owner")
  //   .select()
  //   //select based on criteria:
  //   .match({ is_complete: false });

  if (!session) {
    redirect("/unauthenticated");
  }

  return (
    <>
      <div className={styles.wrap}>
        <h1>
          <strong>Hello ADMIN!</strong>
        </h1>
        <p>
          Amennyiben az alábbi opciók egyikére kattintasz, úgy az az oldal fog
          megjelenni teljes egészében. A navigációs bár alatt lévő oldal
          tartalma teljes egészében módosítható. Csak kattints a szövegre és
          kezd el módosítani azt. {`A sor(ok)`} módosításának végeztével kérlek,
          kattints a <strong>MENTÉS</strong> gombra
        </p>
        <h2>Módosítható oldalak:</h2>
        <span className={styles.links}>
          <Link href={"/cms/home"}>Főoldal</Link>
          <Link href={"/cms/misc"}>Egyéb</Link>
        </span>
      </div>
    </>
  );
}
