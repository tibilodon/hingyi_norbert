import { SupabaseClient } from "@supabase/supabase-js";

const saveImageToBucket = async (
  //   e: React.ChangeEvent<HTMLInputElement>,
  supabase: SupabaseClient<any, "public", any>,
  imageTitle: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(`/${imageTitle}`, file);
  if (error) {
    console.log("error at file upload", error);
  }
  console.log("upload data------:", data);
};
export { saveImageToBucket };
