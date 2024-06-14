'use server'
import SearchResultsArticleListings from "@/components/SearchResults/SearchResultsArticleListings";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@/utils/supabase/server";
import { articles } from "@/Types/allTypes";

export default async function Id({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient()
  const { data, error } = await supabase
    .rpc("search_articles", { searchvalue: params.id })

  return (
    <div className="gap-14 mt-16 px-3 flex flex-col items-center">
      <h2 className="font-extrabold text-2xl md:!text-4xl 2xl:!text-5xl">
        Search results for: {params.id}
      </h2>
      {data && data.length > 0 ? (
        data.map((item: articles) => <SearchResultsArticleListings item={item} />)
      ) : (
        <h1 className="text-3xl text-center">
          No results for the search term '{params.id}' exist
        </h1>
      )}
    </div>
  );
}
