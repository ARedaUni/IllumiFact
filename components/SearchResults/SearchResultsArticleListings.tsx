'use client'
import { articles } from "@/Types/allTypes"
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react"
import Link from "next/link"
import Image from "next/image"
const image = "https://szitjksnkskfwbckrzfc.supabase.co/storage/v1/object/public/articleimages/";
export default function SearchResultsArticleListings({item}: {item: articles}){
    return(
        <Link key={item.id} href={`/factchecks/${item.type}/${item.id}`}>
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
              src={image + item.image!}
              alt="card-image"
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
              className="mb-8 hidden tablet:!block font-normal text-black"
            >
              <div>{item.summary}</div>
            </Typography>
            <a href="#" className="inline-block">
              <Button
                placeholder=""
                variant="text"
                className="flex items-center gap-2"
              >
                Go to Article
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
            </a>
          </CardBody>
        </Card>
      </Link>
    )
}