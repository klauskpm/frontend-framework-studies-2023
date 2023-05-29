import { supabase } from "../features/supabase/supabaseClient";

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
