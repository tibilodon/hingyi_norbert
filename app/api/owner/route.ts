import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//update
export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const id = await req.json();
  console.log("id:", id, "typeof: ", typeof id);
  //   upsert available
  const { data } = await supabase
    .from("Owner")
    .update({ is_complete: true })
    .match(id);

  return NextResponse.json(data);
}
//add delete

export async function DELETE(req: Request) {
  console.log("delete got called");
  const supabase = createRouteHandlerClient({ cookies });
  const id = await req.json();
  const { data } = await supabase.from("Owner").delete().match(id);

  return NextResponse.json(data);
}
