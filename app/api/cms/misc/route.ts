import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//update
export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const load = await req.json();

  const { id, phoneNumber, email, footerText, color } = load;

  try {
    const { data } = await supabase
      .from("Miscellaneous")
      .update({
        phoneNumber: phoneNumber,
        email: email,
        footerText: footerText,
        //color
        color: color,
      })
      //follow this format
      .match({ id: id });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
