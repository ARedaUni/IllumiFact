"use client";
import { Claim } from "@/Types/allTypes";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";

export default function ViewMisinformation({ item }: {item: Claim}) {
    return(
  <Card
    placeholder=""
    color="transparent"
    shadow={false}
    className="w-full border-2 border-gray-200 p-3 mb-4 mt-2 max-w-[600px]"
  >
    <CardHeader
      placeholder=""
      color="transparent"
      floated={false}
      shadow={false}
      className="mx-0 flex items-center gap-4 pt-0 pb-8"
    >
      <div className="flex w-full flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <Typography
            placeholder=""
            variant="h5"
            className="text-sm font-bold md:!text-2xl"
            color="blue-gray"
          >
            Email: {item.claim_author_email}
          </Typography>
        </div>
      </div>
    </CardHeader>
    <CardBody placeholder="" className="mb-6  p-0">
      <p className="font-extrabold">{item.claim_name}</p>
      <Typography placeholder="">{item.claim_content} gdfgsfd</Typography>
    </CardBody>
  </Card>
    )
}
