import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//update
export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const load = await req.json();

  const {
    id,
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
    color,
    imgName,
  } = load.form;

  try {
    const { data, error } = await supabase
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
        //color
        color: color,
        //img
        imgName:
          load.imageName !== ""
            ? process.env.NEXT_PUBLIC_SUPABASE_URL +
              `/storage/v1/object/public/home/${load.imageName}`
            : imgName,
      })
      //follow this format
      .match({ id: id });

    if (error) {
      console.log(error);
      return NextResponse.json(error);
    } else {
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
