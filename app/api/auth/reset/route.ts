import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database } from "@/utils/database.types";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));

  const supabase = createRouteHandlerClient<Database>({
    cookies,
  });

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${requestUrl.origin}/cms/login/reset/update`,
  });

  // TODO:  add check your email page
  return NextResponse.redirect(requestUrl.origin + "/cms/login/check", {
    status: 301,
  });
}
