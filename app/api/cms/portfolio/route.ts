import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//update
export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const load = await req.json();

  const { id, hero, description } = load.form;

  try {
    //portfolio table
    const { data } = await supabase
      .from("Portfolio")
      .update({
        hero,
        description,
        //img
        // imgName:
        //   load.imageName !== ""
        //     ? process.env.NEXT_PUBLIC_SUPABASE_URL +
        //       `/storage/v1/object/public/home/${load.imageName}`
        //     : imgName,
      })
      //follow this format
      .match({ id: id });

    //portfolio_images table

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}

//delete is not needed as only one record will be updated

// export async function DELETE(req: Request) {
//   console.log("delete got called");
//   const supabase = createRouteHandlerClient({ cookies });
//   const id = await req.json();
//   const { data } = await supabase.from("Home").delete().match(id);

//   return NextResponse.json(data);
// }
