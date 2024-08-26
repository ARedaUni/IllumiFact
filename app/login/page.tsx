import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";
import { NextResponse } from "next/server";

async function login(formData: FormData) {
  "use server";
  const supabase = createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // console.log(data, error)
  if (error) {
    throw Error("Invalid Login Credentials")
    
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export default function Login() {
  return (
    // <div className="flex flex-col justify-center  [&>*]:p-3">
    //   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    //     <div className="max-w-sm sm:mx-auto sm:!w-full  text-center">
    //       <h2 className="mt-10 text-center text-3xl xl:!text-5xl font-bold leading-9 tracking-tight text-gray-900">
    //         Sign in
    //       </h2>
    //       <p className="xl:text-2xl xl:mt-3">
    //         Signing up will allow you to comment and submit claims.
    //       </p>
    //     </div>

    //     <div className="mt-10 sm:!w-full ">
    //       <form className="space-y-6" action={login}>
    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="block text-sm xl:!text-xl font-medium leading-6 text-gray-900"
    //           >
    //             Email address
    //           </label>
    //           <div className="mt-2">
    //             <input
    //               id="email"
    //               name="email"
    //               type="email"
    //               autoComplete="email"
    //               required
    //               className="block w-full rounded-md border-0 py-1.5 xl:!py-2 bg-white text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm xl:!text-xl sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <div className="flex items-center justify-between">
    //             <label
    //               htmlFor="password"
    //               className="block text-sm  xl:!text-xl font-medium leading-6 text-gray-900"
    //             >
    //               Password
    //             </label>
    //             <div className="text-sm"></div>
    //           </div>
    //           <div className="mt-2">
    //             <input
    //               id="password"
    //               name="password"
    //               type="password"
    //               autoComplete="current-password"
    //               required
    //               className="block w-full rounded-md border-0 py-1.5 xl:!py-2 text-black bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset px-0.5 focus:ring-indigo-600 text-sm xl:!text-xl sm:leading-6"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //         <button
    //         type="submit"
    //         className="flex w-full text-white text-lg justify-center rounded-md !bg-gradient-to-br from-blue-700 to-purple-500 px-3 py-1.5 font-semibold leading-6 shadow-lg" >
    //         Sign in
    //       </button>
    //         </div>
    //       </form>
    //       <div
    //         id="g_id_onload"
    //         data-client_id="<client ID>"
    //         data-context="signin"
    //         data-ux_mode="popup"
    //         data-callback="handleSignInWithGoogle"
    //         data-nonce=""
    //         data-auto_select="true"
    //         data-itp_support="true"
    //         data-use_fedcm_for_prompt="true"
    //       ></div>

    //       <div
    //         className="g_id_signin"
    //         data-type="standard"
    //         data-shape="pill"
    //         data-theme="outline"
    //         data-text="signin_with"
    //         data-size="large"
    //         data-logo_alignment="left"
    //       ></div>

    //       <p className="mt-10 text-center text-sm xl:!text-xl text-gray-500">
    //         Not a member?{" "}
    //         <a
    //           href="/signup"
    //           className="font-semibold leading-6 text-indigo-600 xl:!text-xl  hover:text-indigo-500"
    //         >
    //           Sign Up
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="flex flex-col items-center justify-center [&>*]:p-3 min-h-screen">
    <div className="bg-white rounded-lg shadow-md p-8 sm:max-w-sm  w-full">
      <h2 className="text-3xl xl:!text-5xl font-bold text-gray-900 text-center mb-2">
        Login
      </h2>
      <p className="xl:text-2xl xl:mt-3 text-gray-600 text-center mb-6">
         Log in to comment, submit claims of misinformation and contribute to the community.
        </p>

      <form action={login} className="space-y-6 [&>*]:my-6">
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

        {/* {errormessage && (
          <Alert 
            icon={<CrossIcon />}
            className="rounded-none border-l-4 border-[rgba(201,80,46,0.94)] bg-[hsla(0,63%,48%,1)] font-medium text-white"
          >
            {errormessage}
          </Alert>
        )} */}

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
          href="/signup"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Sign Up
        </a>
      </p>
    </div>
  </div>
  );
}
