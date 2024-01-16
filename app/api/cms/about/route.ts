import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const load = await req.json();

  //TODO: chain resps
  const {
    newData,
    card1Form,
    card_1_data,
    card2Form,
    card_2_data,
    lowerContent,
    lowerForm,
    upperContent,
    upperForm,
  } = load;

  // --About--
  //handle null image values
  let headshot;
  if (newData.image !== null && newData.image.includes("supabase")) {
    headshot = newData.image;
  } else if (newData.image === null) {
    headshot = null;
  } else {
    headshot =
      process.env.NEXT_PUBLIC_SUPABASE_URL +
      `/storage/v1/object/public/about/${newData.image}`;
  }

  let upperImage;
  if (
    newData.work_card_1_image !== null &&
    newData.work_card_1_image.includes("supabase")
  ) {
    upperImage = newData.work_card_1_image;
  } else if (newData.work_card_1_image === null) {
    upperImage = null;
  } else {
    upperImage =
      process.env.NEXT_PUBLIC_SUPABASE_URL +
      `/storage/v1/object/public/about/${newData.work_card_1_image}`;
  }

  let lowerImage;
  if (
    newData.work_card_2_image !== null &&
    newData.work_card_2_image.includes("supabase")
  ) {
    lowerImage = newData.work_card_2_image;
  } else if (newData.work_card_2_image === null) {
    lowerImage = null;
  } else {
    lowerImage =
      process.env.NEXT_PUBLIC_SUPABASE_URL +
      `/storage/v1/object/public/about/${newData.work_card_2_image}`;
  }
  console.log("headshot", headshot);
  const { data: formUpdate, error: formError } = await supabase
    .from("About")
    .update({
      ...newData,
      // image: newData.image.includes("supabase")
      //   ? newData.image
      //   : process.env.NEXT_PUBLIC_SUPABASE_URL +
      //     `/storage/v1/object/public/about/${newData.image}`,
      image: headshot,
      // work_card_1_image: newData.work_card_1_image.includes("supabase")
      //   ? newData.work_card_1_image
      //   : process.env.NEXT_PUBLIC_SUPABASE_URL +
      //     `/storage/v1/object/public/about/${newData.work_card_1_image}`,
      work_card_1_image: upperImage,
      //   work_card_2_image: newData.work_card_2_image.includes("supabase")
      //     ? newData.work_card_2_image
      //     : process.env.NEXT_PUBLIC_SUPABASE_URL +
      //       `/storage/v1/object/public/about/${newData.work_card_2_image}`,
      work_card_2_image: lowerImage,
    })
    .match({ id: newData.id })
    .select();

  if (formError) {
    return NextResponse.json(formError);
  }
  //  --WorkCardContents--
  //filter out deleted items
  const filteredCard_1_data = card_1_data.filter((card: any) => {
    return !card1Form.some((dataCard: any) => dataCard.id === card.id);
  });
  //delete
  if (filteredCard_1_data.length) {
    const ids = filteredCard_1_data.map(({ id }: any) => id);
    const { error } = await supabase
      .from("WorkCardContents")
      .delete()
      .in("id", ids);
    if (error) {
      return NextResponse.json(error);
    }
  }
  //upsert
  const { data: card1Upsert, error: card1UpsertError } = await supabase
    .from("WorkCardContents")
    .upsert(card1Form, { onConflict: "id" })
    .select();

  if (card1UpsertError) {
    console.log("card1UpsertError--", card1UpsertError);
    return NextResponse.json(card1UpsertError);
  }

  //  --SecondWorkCardContents--
  //filter out deleted items
  const filteredCard_2_data = card_2_data.filter((card: any) => {
    return !card2Form.some((dataCard: any) => dataCard.id === card.id);
  });
  //delete
  if (filteredCard_2_data.length) {
    const ids = filteredCard_2_data.map(({ id }: any) => id);
    const { error } = await supabase
      .from("SecondWorkCardContents")
      .delete()
      .in("id", ids);
    if (error) {
      return NextResponse.json(error);
    }
  }
  //upsert
  const { data: card2Upsert, error: card2UpsertError } = await supabase
    .from("SecondWorkCardContents")
    .upsert(card2Form, { onConflict: "id" })
    .select();

  if (card2UpsertError) {
    console.log("card2UpsertError--", card2UpsertError);
    return NextResponse.json(card2UpsertError);
  }

  //  --About_content_uppers--
  //filter out deleted items
  const upper_content_data = upperContent.filter((card: any) => {
    return !upperForm.some((dataCard: any) => dataCard.id === card.id);
  });
  console.log("to be deleted", upper_content_data);
  //delete
  if (upper_content_data.length) {
    console.log("about to delete");
    const ids = upper_content_data.map(({ id }: any) => id);
    const { error } = await supabase
      .from("About_content_uppers")
      .delete()
      .in("id", ids);
    if (error) {
      return NextResponse.json(error);
    }
  }
  //upsert
  const { data: upperUpsert, error: upperUpsertError } = await supabase
    .from("About_content_uppers")
    .upsert(upperForm, { onConflict: "id" })
    .select();

  console.log("--UPPER form--", upperForm);
  //  handle error
  if (upperUpsertError) {
    console.log("upperUpsertError--", upperUpsertError);
    return NextResponse.json(upperUpsertError);
  }

  //  --About_content_lowers--
  //filter out deleted items
  const lower_content_data = lowerContent.filter((card: any) => {
    return !lowerForm.some((dataCard: any) => dataCard.id === card.id);
  });
  console.log("to be deleted", lower_content_data);
  //delete
  if (lower_content_data.length) {
    console.log("about to delete");
    const ids = lower_content_data.map(({ id }: any) => id);
    const { error } = await supabase
      .from("About_content_lowers")
      .delete()
      .in("id", ids);
    if (error) {
      return NextResponse.json(error);
    }
  }
  //upsert
  const { data: lowerUpsert, error: lowerUpsertError } = await supabase
    .from("About_content_lowers")
    .upsert(lowerForm, { onConflict: "id" })
    .select();

  console.log("--UPPER form--", upperForm);
  //  handle error
  if (lowerUpsertError) {
    console.log("lowerUpsertError--", lowerUpsertError);
    return NextResponse.json(lowerUpsertError);
  }

  return NextResponse.json("good");
}
