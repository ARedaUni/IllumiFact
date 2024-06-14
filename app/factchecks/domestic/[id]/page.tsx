"use server";
import ArticlePage from "@/components/Articles/ArticlePage/ArticlePage";
import Comments from "@/components/Comments/Comments";
import { createClient } from "@/utils/supabase/server";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const session = await supabase.auth.getUser();

  const userdata = await supabase
    .from("users")
    .select()
    .eq("id", session?.data?.user?.id);
  
    
 
  const comment = await supabase
    .from("comments")
    .select()
    .eq("article_id", params.id);

  

  const { data, error } = await supabase
    .from("articles")
    .select()
    .eq("id", params.id);

  return (
    <div>
      {data !== null  ? (
        <div className="max-w-72 tablet:max-w-[400px] md:!max-w-none">
          <ArticlePage articles={data[0]} />
          <Comments comments={comment.data}
             user={userdata.data}
             articleid={params.id} />
        </div>
       ) :
        <div>Page not found</div>
      }
    </div>
  );
}