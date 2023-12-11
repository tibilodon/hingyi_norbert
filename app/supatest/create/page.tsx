import styles from "./page.module.css";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

import type { Database } from "@/utils/database.types";

export default async function NewOwner() {
  const addTodo = async (formData: FormData) => {
    "use server";

    // const title = String(formData.get("title"));
    const title = String(formData.get("title"));
    // const email = String(formData.get("email"));
    // const phone = String(formData.get("phone"));
    // const name = "nadja";
    // const email = "nadja@gmail.com";
    // const phone = "0112345";
    // const cookieStore = cookies();
    const supabase = createServerActionClient<Database>({
      cookies,
    });
    const req = await supabase.from("Owner").insert({ title });
    console.log(req);
    revalidatePath("/test");
    // try {
    //   const req = await supabase.from("Owner").insert({ email, phone, name });
    //   //   console.log(req);
    //   revalidatePath("/test");
    // } catch (error) {
    //   console.log("Supabase insert error:", error);
    // }
  };

  return (
    <>
      <div className={styles.wrap}>
        <form action={addTodo}>
          {/* <input name="title" /> */}
          <input name="title" />
          {/* <input name="email" />
          <input name="phone" /> */}
          <button type="submit">clickl</button>
        </form>
      </div>
    </>
  );
}
