import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//update
export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  //   const id = await req.json();

  console.log("data", req.body);
  //   const { data } = await supabase
  //     .from("Home")
  //     .update({ is_complete: true })
  //     .match(id);

  //   return NextResponse.json(data);
}

//delete is not needed as only one record will be updated

// export async function DELETE(req: Request) {
//   console.log("delete got called");
//   const supabase = createRouteHandlerClient({ cookies });
//   const id = await req.json();
//   const { data } = await supabase.from("Home").delete().match(id);

//   return NextResponse.json(data);
// }
