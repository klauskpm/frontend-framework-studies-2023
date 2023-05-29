import { supabase } from "../../supabase/supabaseClient";

export async function uploadAvatar(file: File) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const response = await supabase.storage.from('avatars').upload(filePath, file)

    return {
        filePath,
        ...response
    };
}