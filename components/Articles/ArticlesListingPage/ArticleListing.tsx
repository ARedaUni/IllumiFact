'use client'
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { articles, articlesArray } from "@/Types/allTypes";
import Image from "next/image";
export default function ArticleListing({
  articleContent, edit
}: {
  articleContent: articlesArray | null, edit:boolean;
}) {
  const image =
    "https://szitjksnkskfwbckrzfc.supabase.co/storage/v1/object/public/articleimages/";

  return (
    <div className="flex [&>*]:my-6 flex-col  [&>*]:mx-3 md:mt-24 ">
      
      {articleContent &&
        articleContent.map((item: articles) => {
          return (
            <Link key={item.id} href={!edit ? `/factchecks/${item.type}/${item.id}`: `editarticles/${item.id}`}>
              <Card
                placeholder=""
                className="w-full max-w-[48rem] 2xl:max-w-[56rem] flex-row"
              >
                <CardHeader
                  placeholder=""
                  shadow={false}
                  floated={false}
                  className="m-0 w-2/5 shrink-0 rounded-r-none"
                >
                  <Image
                    src={image + item.image}
                    alt={`Article image for ${item.title}`}
                    className="h-full w-full object-cover"
                    height={400}
                    width={400}
                  />
                </CardHeader>
                <CardBody placeholder="">
                  <Typography
                    placeholder=""
                    variant="h4"
                    color="blue-gray"
                    className="mb-2"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    placeholder=""
                    color="gray"
                    className="mb-8 font-normal text-black"
                  >
                    <p className="line-clamp-2 tablet:line-clamp-4 md:!line-clamp-none">
                      {item.summary}
                    </p>
                  </Typography>
                  
                    <Button
                      placeholder=""
                      variant="text"
                      id="button to go to article"
                      className="flex items-center gap-2"
                    >
                      {edit ? `Edit Article` :`Go to Article`} 
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                    </Button>
                  
                </CardBody>
              </Card>
            </Link>
          );
        })}
    </div>
  );
}
