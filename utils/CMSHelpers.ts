import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const swapImage = async (
  bucketName: string,
  supabase: SupabaseClient<any, "public", any>,
  imageTitle: string,
  file: File,
  prevImage: string
) => {
  try {
    //delete
    if (prevImage) {
      const removeImage = prevImage.substring(prevImage.lastIndexOf("/") + 1);

      console.log("removeimage", removeImage);
      // const { data: delImage } = await supabase.storage
      //   .from(bucketName)
      //   .remove([`${removeImage}`]);
      await supabase.storage.from(bucketName).remove([`${removeImage}`]);
    }
    //then upload
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`/${imageTitle}`, file);

    //  log error if any
    if (error) {
      console.log("error at file upload", error);
      return error;
    }
    //  otherwise, return data

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
};

type ImageData =
  | {
      created_at: string;
      description: string | null;
      id: number;
      image: string | null;
      position: number | null;
      table_id: number;
      updated_at: string | null;
      user_id: string | null;
    }[];

//TODO: loop through here
const deleteImagesFromBucket = async (
  bucketName: string,
  supabase: SupabaseClient<any, "public", any>,
  imgData: ImageData
) => {
  try {
    const removeImage = imgData?.map((item) => item.image);

    const filteredRemoveImage = removeImage.filter(
      (item) => item !== null
    ) as string[];
    const resp = await supabase.storage
      .from(bucketName)
      //add all deletable images as an array like so:
      // .remove(['folder/avatar1.png'])-- no folder is present, therefore omit that
      .remove(filteredRemoveImage);
    return NextResponse.json(resp);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
};

type NewImages =
  | {
      file: File | null;
      fileName: string;
      description: string;
      position: number;
    }[];
const saveImageToBucket = async (
  bucketName: string,
  supabase: SupabaseClient<any, "public", any>,
  imageData: NewImages
) => {
  const uploadPromises = [];

  for (let index = 0; index < imageData.length; index++) {
    const el = imageData[index];
    const uploadPromise = supabase.storage
      .from(bucketName)
      .upload(`/${el.fileName}`, el.file!!);
    uploadPromises.push(uploadPromise);
  }
  try {
    const responses = await Promise.all(uploadPromises);

    // Check if all responses were successful
    const allResponsesSuccessful = responses.every(
      (response) => !response.error
    );

    if (allResponsesSuccessful) {
      // Proceed with your function
      // ...
      console.log("All uploads were successful!");
      return NextResponse.json(responses);
    } else {
      // Handle case where not all uploads were successful
      console.log("Some uploads failed. Handle accordingly.");
      return NextResponse.error();
    }
  } catch (error) {
    // Handle errors from the uploads
    console.error("Error during upload:", error);
  }
};
export { swapImage, deleteImagesFromBucket, saveImageToBucket };
