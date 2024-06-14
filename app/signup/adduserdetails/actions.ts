//import { uploadImageToSupabaseBucket } from "@/utils/usefulFunctions/uploadImageToSupabaseBucket";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
export async function uploadToDatabase(
  user: User, 
  formData: FormData
) {
  "use server";
  const username = formData.get("username") as string;
  const image = formData.get("profile-picture");
  const supabase = createClient()
  async function uploadImageToSupabaseBucket(bucketName: string, imageName: string, image: File|null|any) {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(imageName, image, {
        cacheControl: "3600",
        upsert: false,
      });
  };
  if (image && image instanceof File && image.name !== "" && username !== "") {
    const { error } = await supabase
      .from("users")
      .update({ username: username, pfp: image.name })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating user data:", error);
      return;
    }

    await uploadImageToSupabaseBucket("userprofilepictures", image.name, image);
    
  }
}
