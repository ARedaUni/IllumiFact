"use client";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
export default function SettingsComponents({ user }) {
  const img =
    "https://szitjksnkskfwbckrzfc.supabase.co/storage/v1/object/public/userprofilepictures/";
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setImage(selectedFile);
      setImageName(selectedFile.name);
    }
  }

  return (
    <div className="grid max-w-2xl mx-auto mt-8">
      <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
        {!image ? (
          <Image
            className="object-cover w-40 h-40 p-1 rounded-full border-black ring-2 "
            src={img + user[0].pfp}
            alt="Bordered avatar"
            width={140}
            height={140}
          />
        ) : (
          <Image
            className="object-cover w-40 h-40 p-1 border-black rounded-full ring-2 "
            src={URL.createObjectURL(image)}
            alt="Bordered avatar"
            width={140}
            height={140}
          />
        )}
        <div className="flex flex-col space-y-5 sm:ml-8">
          <label
            htmlFor="file-upload"
            className="cursor-pointer border-2 navconfig:!text-xl border-black p-2 rounded-md"
          >
            Choose File
          </label>
          <input
            type="file"
            id="file-upload"
            name="image"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            className="py-3.5  px-7 text-base font-medium hover:cursor-pointer  focus:outline-none  rounded-lg border border-black  focus:z-10 focus:ring-4 "
          ></input>
        </div>
      </div>

      <div className="items-center mt-8 sm:mt-14 text-[#000000]">
        <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
          <div className="w-full">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-black navconfig:!text-xl"
            >
              Your name
            </label>
            <input
              type="text"
              id="first_name"
              name="username"
              className="border border-black text-sm navconfig:!text-xl text-black rounded-lg  block w-full p-2.5 "
              defaultValue={user[0].username as string}
              required
            />
          </div>
        </div>
        <div className="mb-2 sm:mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm navconfig:!text-xl font-medium text-black"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-black text-sm navconfig:!text-xl rounded-lg  block w-full p-2.5 "
            defaultValue={user[0].email as string}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-white border border-white  font-medium rounded-lg text-sm navconfig:!text-xl w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-br from-blue-700 to-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
