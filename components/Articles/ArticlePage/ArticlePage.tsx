'use client'
import { Database } from "@/supabase";
import { useEffect } from "react";
import { convertToStringData } from "@/utils/usefulFunctions/convertToStringData";
import { articles } from "@/Types/allTypes";
export default function ArticlePage({ articles }: { articles: articles }) {
  useEffect(() => {
    document.getElementById("content")!.innerHTML = articles.content;
    console.log('work')
  }, []);

  return (
    <div className="flex flex-col justify-start   mt-6 md:!mt-24 max-w-3xl xl:max-w-4xl">
      <h1 className="text-3xl navconfig:text-5xl mb-6 font-extrabold">{articles.title}</h1>
      <p>Published at {convertToStringData(articles.published_at)}</p>
      <div className="md:flex  border-blue-900 border p-3 mt-16 rounded-lg shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
        <div className="p-2 md:min-w-56">
          <p className="font-extrabold text-xl">What was claimed</p>
          <p className="leading-7 font-semibold">{articles.claimedSummary}</p>
        </div>
        <div className="h-0.5 w-full md:h-56 md:w-4 bg-black min-h-max"></div>
        <div className="p-2 md:min-w-56 md:ml-4">
          <p className="font-extrabold text-xl">Summary of our analysis</p>
          <p className="leading-7 font-semibold">{articles.ourConclusion}</p>
        </div>
      </div>
      <div className="mt-16 font-normal text-black leading-10 text-lg">
        <div id="content"></div>
      </div>
    </div>
  );
}