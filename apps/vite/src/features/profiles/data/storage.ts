import { supabase } from "../../supabase/supabaseClient";

export async function uploadAvatar(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const response = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  return {
    filePath,
    ...response,
  };
}

export async function downloadImage(path: any): Promise<string> {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);
    if (error) {
      throw error;
    }
    const url = URL.createObjectURL(data);
    return url;
  } catch (error: any) {
    console.log("Error downloading image: ", error.message);
    throw error;
  }
}
