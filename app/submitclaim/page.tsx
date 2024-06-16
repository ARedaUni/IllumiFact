import { redirect } from "next/navigation";
import { submitMisinformationClaim } from "./actions";
import { createClient } from "@/utils/supabase/server";

export default async function Submitclaim() {
  const supabase = createClient();
  const {data} = await supabase.auth.getUser()
  if(data.user === null) redirect('/')
 
  return (
    <div className="flex flex-col justify-center  mx-4  md:!max-w-3xl tablet:mt-12  2xl:!max-w-4xl">
      <h1 className="text-2xl md:!text-4xl font-extrabold my-2">
        Submit a claim of misinformation
      </h1>
      <p>
        If you have seen any claims of misinformation that you believe may cause
        significant harm in society, summarise it below and provide the source
        of that misinformation. If we believe that it has a harmful effect, it
        will be fact checked and written about.
      </p>
      <div className="[&>*]:my-8 tablet:[&>*]:my-16">
        <form action={submitMisinformationClaim}>
          <div className="flex flex-col [&>*]:my-2">
            <label className="text-xl" htmlFor="claimName">
              Claim name:
            </label>
            <input
              type="text"
              className="rounded-md p-2 shadow-lg border-2 border-black"
              id="claimName"
              name="claimName"
              minLength={6}
              required
            ></input>

            <label className="text-xl" htmlFor="claimSummary">
              Summarise the claim:
            </label>
            <textarea
              name="claimSummary"
              className="rounded-lg p-2 shadow-lg border-2 border-black"
              id="claimSummary"
              cols={30}
              rows={10}
              minLength={200}
              required
            ></textarea>

          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="font-bold text-xl bg-gradient-to-br text-white max-w-36 p-1 rounded-lg  from-blue-700 to-purple-500 "
            >
              Submit Claim
            </button>
          </div>
        </form>
        <div></div>
      </div>
      <div></div>
    </div>
  );
}
