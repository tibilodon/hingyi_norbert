import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const load = await req.json();

  try {
    const { data, error } = await supabase
      .from("Contact")
      .update(load)
      .match({ id: load.id })
      .select();
    if (data) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(error);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
