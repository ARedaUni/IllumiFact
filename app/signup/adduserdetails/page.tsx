"use client";
import { createClient } from "@/utils/supabase/supabase";
import { User } from "@supabase/supabase-js";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";

export default function adduserdetails() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUserName] = useState("");
  const [image, setImage] = useState<string>();
  const [imageObject, setImageObject] = useState<File>();
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));

      setImageObject(event.target.files[0]);
      console.log(event.target.files[0].name);
    }
  };
  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      session && setUser(session.user);
    });
  }, []);

  async function upload(e:any, image: File|undefined, username: string) {
    e.preventDefault();
    async function uploadImageToSupabaseBucket(
      bucketName: string,
      imageName: string,
      image: File | null | any
    ) {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(imageName, image, {
          cacheControl: "3600",
          upsert: false,
        });
    }
    if (
      image &&
      image instanceof File &&
      image.name !== "" &&
      username &&
      username !== ""
    ) {
      const { error } = await supabase
        .from("users")
        .update({ username: username, pfp: image.name })
        .eq("id", user!.id);

      if (error) {
        console.error("Error updating user data:", error);
        return;
      }

      await uploadImageToSupabaseBucket(
        "userprofilepictures",
        image.name,
        image
      );
      window.location.assign("/");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-3 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 sm:max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Confirm User
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Add your username and profile picture.
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              maxLength={9}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="profile-picture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile picture
            </label>
            <input
              type="file"
              id="profile-picture"
              name="profile-picture"
              onChange={handleImageUpload}
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-500"
            />
          </div>
          {image ? <img src={image}></img> : <div></div>}
          <button
            onClick={(e) => upload(e, imageObject, username)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-md hover:opacity-90 focus:outline-none"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
