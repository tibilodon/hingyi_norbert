import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

//update
export async function PUT(req: Request, res: Response) {
  const supabase = createRouteHandlerClient({ cookies });

  const load = await req.json();

  const { id, hero, description } = load.form;

  //TODO: imagesForm && newImages
  try {
    //portfolio table
    const { data: portfolioData, error: portfolioError } = await supabase
      .from("Portfolio")
      .update({
        hero,
        description,
      })
      .match({ id: id })
      .select();

    if (portfolioError) {
      return NextResponse.json(portfolioError);
    }

    //  portfolio_images table
    if (portfolioData) {
      //  delete if any
      if (load.toBeDeletedImages !== null) {
        const ids = load.toBeDeletedImages.map(({ id }: any) => id);

        const { error } = await supabase
          .from("Portfolio_Images")
          .delete()
          .in("id", ids);

        if (error) {
          console.log("--DELETE ERROR--", error);
          return NextResponse.json(error);
        }
      }

      //  create new record(s) from newImages
      if (load.newImages !== null) {
        console.log("NEW IMG DATA", load.newImages);
        const data = load.newImages?.map((item: any) => {
          return {
            table_id: 1,
            image:
              process.env.NEXT_PUBLIC_SUPABASE_URL +
              `/storage/v1/object/public/portfolio/${item.fileName}`,
            description: item.description,
            position: item.position,
          };
        });
        const { data: newImagesData, error: newImagesError } = await supabase
          .from("Portfolio_Images")
          .insert(data)
          .select();

        //  handle error
        if (newImagesError) {
          console.log(" ERROR---newImagesdata", newImagesError);
          return NextResponse.json(newImagesError);
        }
      }

      //  upsert existing records
      const { data: imagesData, error: imagesError } = await supabase
        .from("Portfolio_Images")
        .upsert(load.imagesForm)
        .select();

      //handle error
      if (imagesError) {
        console.log("----ERROR---", imagesError);
        return NextResponse.json(imagesError);
      }

      // console.log("---imagesData", imagesData);
      return NextResponse.json(imagesData);
    }
    //handle error
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
