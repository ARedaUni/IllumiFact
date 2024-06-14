"use server";
import { comments, users } from "@/Types/allTypes";
import ArticlePage from "@/components/Articles/ArticlePage/ArticlePage";
import Comments from "@/components/Comments/Comments";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse, User } from "@supabase/supabase-js";

export default async function Page({ params }: { params: { id: number } }) {
  const supabase = createClient();
  const session = await supabase.auth.getUser();
//below should be a full response with {data: response, error: null or otherway round}
  const userdata:PostgrestSingleResponse<any | null> = await supabase
    .from("users")
    .select()
    .eq("id", session?.data?.user?.id);

  const comment: PostgrestSingleResponse<comments[] | null> = await supabase
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
