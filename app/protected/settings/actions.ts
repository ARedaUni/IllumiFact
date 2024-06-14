
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";

export async function uploadToDatabase(user: User,  formData: FormData) {
  'use server'
  const supabase = createClient();

  async function uploadImageToSupabaseBucket(bucketName: string, imageName: string, image: File|null|any) {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(imageName, image, {
        cacheControl: "3600",
        upsert: false,
      });
  };
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const image = formData.get("image") as File;

  const { error } = await supabase.auth.updateUser({
    email,
  });

  if (image?.name === "undefined") {
    const { data, error } = await supabase
      .from("users")
      .update({ username: username })
      .eq("id", user.id);
  } else if (image?.name !== "undefined") {
    const { data } = await supabase
      .from("users")
      .update({ username: username, pfp: image?.name })
      .eq("id", user.id);
    await uploadImageToSupabaseBucket("userprofilepictures", image?.name, image);
  }
}
