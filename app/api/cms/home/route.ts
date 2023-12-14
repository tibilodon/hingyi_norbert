import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//update
export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const load = await req.json();
  console.log(load);
  const {
    name,
    profession,
    btn1,
    phoneNumber,
    btn3,
    line1_1,
    line1_2,
    line1_3,
    line1_4,
    //banner
    banner_hero,
    bannerBox_1_label,
    bannerBox_1_text,
    bannerBox_2_label,
    bannerBox_2_text,
    bannerBox_3_label,
    bannerBox_3_text,
    bannerBox_4_label,
    bannerBox_4_text,
    imgName,
  } = load;

  try {
    const { data } = await supabase
      .from("Home")
      .update({
        name: name,
        profession: profession,
        btn1: btn1,
        phoneNumber: phoneNumber,
        btn3: btn3,
        line1_1: line1_1,
        line1_2: line1_2,
        line1_3: line1_3,
        line1_4: line1_4,
        //banner
        banner_hero: banner_hero,
        bannerBox_1_label: bannerBox_1_label,
        bannerBox_1_text: bannerBox_1_text,
        bannerBox_2_label: bannerBox_2_label,
        bannerBox_2_text: bannerBox_2_text,
        bannerBox_3_label: bannerBox_3_label,
        bannerBox_3_text: bannerBox_3_text,
        bannerBox_4_label: bannerBox_4_label,
        bannerBox_4_text: bannerBox_4_text,
        imgName: `https://rjmxmwhnheymokiexmyb.supabase.co/storage/v1/object/public/images/${imgName}`,
      })
      //follow this format
      .match({ id: load.id });

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
