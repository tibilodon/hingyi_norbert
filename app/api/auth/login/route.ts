import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/utils/database.types";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({
    cookies,
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data) {
    //  redirect after logged in
    console.log("authenticated, proceed to login");
    return NextResponse.redirect(requestUrl.origin + "/cms/login/profile", {
      status: 301,
    });
  }
  if (error) {
    //  redirect after logged in
    console.log("error @ login");
    return NextResponse.redirect(requestUrl.origin + "/error", {
      status: 301,
    });
  }
}
