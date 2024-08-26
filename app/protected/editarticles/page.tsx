import { createClient } from "@/utils/supabase/server";
import ArticleListing from "@/components/Articles/ArticlesListingPage/ArticleListing";
import { articlesArray } from "@/Types/allTypes";

export default async function Domestic() {
  const image =
    "https://szitjksnkskfwbckrzfc.supabase.co/storage/v1/object/public/articleimages/";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select()

    return (
      <div className="flex [&>*]:my-6 flex-col mt-12 [&>*]:mx-3 md:mt-24">
        <h1 className="domesticpagetitle font-extrabold text-2xl  md:!text-4xl 2xl:!text-5xl ">
          Edit Articles
        </h1>
        <ArticleListing articleContent={data} edit={true}/>

      </div>
    );
}
