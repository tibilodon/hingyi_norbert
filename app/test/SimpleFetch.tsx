import styles from "./page.module.css";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Owner from "./Owner";

type Props = {};

const SimpleFetchProtectedRoute = async (props: Props) => {
  const supabase = createServerComponentClient({ cookies });
  const { data: owner } = await supabase
    .from("Owner")
    .select()
    .match({ is_complete: true });

  return (
    <div className={styles.wrap}>
      <h1>simple watch for isComplete true</h1>
      {owner &&
        owner.map((item) => {
          return (
            <span key={item.id}>
              <Owner item={item} />
            </span>
          );
        })}
    </div>
  );
};

export default SimpleFetchProtectedRoute;
