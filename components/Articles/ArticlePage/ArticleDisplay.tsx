"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { createClient } from "@/utils/supabase/supabase";
import Image from "next/image";
import Link from "next/link";
import { Role, articleDisplayPropsTypes, user_roles } from "@/Types/allTypes";
import { convertToStringData } from "@/utils/usefulFunctions/convertToStringData";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";

export default function ArticleDisplay({ post }: articleDisplayPropsTypes) {
  const image =
    "https://szitjksnkskfwbckrzfc.supabase.co/storage/v1/object/public/articleimages/";
  const [role, setRole] = useState<Role|null>(null);
  const [img, setImg] = useState(null);

  const supabase = createClient();

  async function deleteArticle(id: number) {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    const { data } = await supabase
      .from("comments")
      .delete()
      .eq("article_id", id);
  }

  useEffect(() => {
    const x = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const jwt = jwtDecode(session.access_token);
        const userRole = (jwt as JwtPayload & {user_role: Role}).user_role;
        setRole(userRole);
      }
    });
  }, []);
  return (
    <Card
      className="max-w-[24rem] overflow-hidden flex flex-col items-stretch "
      placeholder=""
    >
      <div>
        {" "}
        <Link key={post.id} href={`/factchecks/${post.type}/${post.id}`}>
          <CardHeader
            placeholder=""
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <Image src={image + post.image} loading="eager" alt="article cover picture" height={400} width={400} priority />
            

            {/* <img src={image+post.image} alt="article cover picture" height={400} width={400}></img> */}
          </CardHeader>
        </Link>
      </div>

      <CardBody placeholder="" className="flex-1">
        <div className="flex justify-between">
          <p className="text-2xl font-bold text-black">
            {post.title}
          </p>
          {role && role === "admin" ? (
            <button
              onClick={() => {
                deleteArticle(post.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                height="24px"
                width="24px"
                version="1.1"
                id="Icons"
                viewBox="0 0 32 32"
              >
                <path d="M24,8h-3V7c0-2.8-2.2-5-5-5s-5,2.2-5,5v1H8c-1.7,0-3,1.3-3,3v3c0,0.6,0.4,1,1,1h1v12c0,1.7,1.3,3,3,3h12c1.7,0,3-1.3,3-3V15  h1c0.6,0,1-0.4,1-1v-3C27,9.3,25.7,8,24,8z M13,7c0-1.7,1.3-3,3-3s3,1.3,3,3v1h-6V7z M14,24c0,0.6-0.4,1-1,1s-1-0.4-1-1v-5  c0-0.6,0.4-1,1-1s1,0.4,1,1V24z M20,24c0,0.6-0.4,1-1,1s-1-0.4-1-1v-5c0-0.6,0.4-1,1-1s1,0.4,1,1V24z" />
              </svg>
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <p
          color="gray"
          className="mt-3 text-xl"
        >
          {post.summary}
        </p>
      </CardBody>
      <CardFooter
        placeholder=""
        className="flex items-center !justify-between mb-0"
      >
        <div className="flex items-center -space-x-3">{post.author_name}</div>
        <p className="font-normal">
          {convertToStringData(post.published_at)}
        </p>
      </CardFooter>
    </Card>
  );
}
