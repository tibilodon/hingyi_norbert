"use client";
import styles from "./page.module.css";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import type { Database } from "@/utils/database.types";

type Owner = Database["public"]["Tables"]["Owner"]["Row"];

export default function Page() {
  const [owner, setOwner] = useState<Owner[] | null>(null);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("Owner").select();
      console.log(data);
      setOwner(data);
    };

    getData();
  });

  return owner ? (
    <>
      <div className={styles.wrap}>
        <pre>{JSON.stringify(owner, null, 2)}</pre>
      </div>
    </>
  ) : (
    <>
      <div className={styles.wrap}>
        <p>Loading owner...</p>
      </div>
    </>
  );
}
