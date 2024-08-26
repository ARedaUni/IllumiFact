import App from "@/components/ArticleEdit/Editor";
import { createClient } from "@/utils/supabase/server";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
 const session = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("articles")
    .select()
    .eq("id", params.id);

  // const data = await fetch("http://127.0.0.1:54321/functions/v1/getSingleArticle", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "id": params.id
  //   }
  // })
  //   .then((response) => response.json())
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
 
   return <App articlecontent={data?.[0]}/>;
}
