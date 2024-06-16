import ArticleDisplay from "@/components/Articles/ArticlePage/ArticleDisplay";
import { articles, sessionType } from "@/Types/allTypes";
import { HomepageListing } from "@/components/Articles/ArticlesListingPage/HomepageListing";
import { PostgrestSingleResponse, User, UserResponse} from "@supabase/supabase-js";
import { explanation1, explanation2, explanation3 } from "@/utils/ArticleBaseText/BaseText";
import { createClient } from "@/utils/supabase/server";
export default async function Home() {
  //const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
 const supabase = createClient();
 //const { data: {session}, error: sessionError } = await supabase.auth.getSession();

 // Fetch data from your Edge Function
//  const response = await fetch('http://127.0.0.1:54321/functions/v1/getArticles', {
//      headers: {
//          'Authorization': `Bearer ${session?.access_token}` // Pass JWT if available
//      }
//  });
//  const { data: articles, error: fetchError } = await response.json();
//  console.log(articles, fetchError)
 
  // const {data} = await supabase.auth.getSession();
  // console.log(data.session?.access_token)

//  const {data, error} = await supabase.functions.invoke('getArticles', {
//     method: "GET"
//  })
//   // redirect('/signup/adduserdetails')
 //landingpageanimation
 const {data}: PostgrestSingleResponse<articles[]|null> = await supabase.from("articles").select("*");
 
  return (
    <>
    
    <div className=" flex justify-center max-w-80 sm:max-w-none flex-col items-center my-5 navconfig:!my-14">
     
      <div className="text-center  text-wrap  sm:!max-w-none" >
      <h3 className="text-shadow  hidden sm:!visible text-2xl md:!text-4xl text-center">We shed light on the political misinformation<br/> in society that threatens our democracy<br/> and the lives of those at home and abroad.</h3>
      </div>
      <div className=" hidden  xl:!flex flex-col   [&>*]:my-3 first:!my-0 xl:!flex-row [&>*]:mx-3 " >
        <HomepageListing name='Highlight' explanation={explanation1} image='torch'/>
        <div className="mb-14">
          <HomepageListing  name='Correct' explanation={explanation2} image='critical'/>
        </div>
        <HomepageListing name='Hold to account' explanation={explanation3} image='justice'/>
      </div>
      
      <div className="gap-14 px-3 mt-5 grid sm:grid-cols-1 lg:grid-cols-2 xl:!grid-cols-3 " >
      {data && data.length>0 && data.map((item: articles) => (
          <ArticleDisplay   key={item.id} post={item}/>
      ))}
      </div>
    </div>
    </>
  );
}
