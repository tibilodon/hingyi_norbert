import { SupabaseClient } from "@supabase/supabase-js";

const saveImageToBucket = async (
  prevImage: string,
  supabase: SupabaseClient<any, "public", any>,
  imageTitle: string,
  file: File
) => {
  try {
    const removeImage = prevImage.substring(prevImage.lastIndexOf("/") + 1);

    const { data: delImage } = await supabase.storage
      .from("images")
      .remove([`${removeImage}`]);

    console.log("deleted", delImage);
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`/${imageTitle}`, file);
    if (error) {
      console.log("error at file upload", error);
    }
    console.log("upload data------:", data);
    return;
  } catch (error) {
    console.log(error);
  }
};
export { saveImageToBucket };
