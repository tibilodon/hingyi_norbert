import styles from "./page.module.css";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import type { Database } from "@/utils/database.types";
import TestForm from "./TestForm";
import NewOwner from "../supatest/create/page";
import Login from "../login/page";
import RealTimeOwner from "./RealTimeOwner";
import SimpleFetchProtectedRoute from "./SimpleFetch";
import Image from "next/image";

export default async function ServerComponent() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  //no realtime updates
  // const { data } = await supabase.from("Owner").select();

  const { data: owner } = await supabase
    .from("Owner")
    .select()
    //select based on criteria:
    .match({ is_complete: false });

  //TODO:
  //---FOR AUTH REQUIRED DATA PRESENTATION--SET RLS RULES ACCORDINGLY--
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/unauthenticated");
  }

  // const { data: image } = await supabase.storage.from("images").list("/");
  // console.log(image);
  // .getPublicUrl("landing");
  // const { data: testUpdate } = await supabase.storage
  //   .from("images")
  //   .update("images/opengraph-image.png", testImage.src);

  // .getPublicUrl("opengraph-image.png");

  // console.log("images me nigfga:", img);
  // let imgName;

  //  TODO: img name returned, get getPublicUrl with that
  // if (Array.isArray(img)) {
  //   imgName = img[0];
  // }

  return (
    <>
      <div className={styles.wrap}>
        {/*/TODO:
  ---FOR AUTH REQUIRED DATA PRESENTATION--SET RLS RULES ACCORDINGLY--*/}
        <h1>{session.user.email}</h1>
        <h1>{session.user.id}</h1>
        {/* <img width={40} height={40} src={image.publicUrl} alt="test" /> */}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {/* <TestForm /> */}
        {/* <Login /> */}
        <NewOwner />
        <RealTimeOwner owner={owner} />
        <SimpleFetchProtectedRoute />
        <form action="/api/auth/logout" method="post">
          <button type="submit" formAction="/api/auth/logout">
            Log Out
          </button>
        </form>
      </div>
    </>
  );
}
