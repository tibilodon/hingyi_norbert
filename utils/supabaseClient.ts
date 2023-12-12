import { Database } from "./database.types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const supaCreateServerComponentClient = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  return supabase;
};

const supaServerComponentClientSession = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};
export { supaServerComponentClientSession, supaCreateServerComponentClient };
