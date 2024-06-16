import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

async function signup(formData: FormData) {
  "use server";

  const supabase = createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw Error(""+error.message)
  else redirect('/signup/success') 
  //console.log(error)
  // fetch("http://127.0.0.1:54321/functions/v1/signUp", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email, password }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Success:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
 
}
// USE ZOD FOR SERVER SIDE VALIDATION
export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center [&>*]:p-3 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-8 sm:max-w-sm w-full">
        <h2 className="text-3xl xl:!text-5xl font-bold text-gray-900 text-center mb-2">
          Sign Up
        </h2>
        <p className="xl:text-2xl xl:mt-3 text-gray-600 text-center mb-6">
          Signing up will allow you to comment and submit claims.
        </p>

        <form action={signup} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm xl:!text-xl font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-500 text-sm xl:!text-xl"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm xl:!text-xl font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-500 text-sm xl:!text-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg py-2 rounded-md hover:opacity-90 focus:outline-none"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-10 text-center text-sm xl:!text-xl text-black">
          Already a member?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
