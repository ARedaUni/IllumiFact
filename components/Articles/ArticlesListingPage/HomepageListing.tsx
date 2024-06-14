'use client'
import { CardDefaultProps } from "@/Types/allTypes";
import { Card, CardHeader, CardBody, Typography, CardFooter } from "@material-tailwind/react";
import criticalthinking from '@/public/images/criticalthinking.webp-desktopimg.jpg'
import justice from '@/public/images/justice.webp-desktopimg.jpg'
import torch from '@/public/images/torch.webp-desktopimg.jpg'
import Image from "next/image";
export function HomepageListing({ name, explanation, image}: CardDefaultProps){
    return(
      <Card className="mt-6 w-96" placeholder={'none'}>
        <CardHeader color="blue-gray" className="relative h-56" placeholder={'none'}>
          {image === 'torch' ? <Image src={torch} loading="eager" alt={`Article image for ${name}`} /> : image==='justice' ? <Image loading="eager" src={justice}  alt={`Article image for ${name}`} /> : <Image src={criticalthinking} loading="eager"  alt={`Article image for ${name}`} /> }

        </CardHeader>
        <CardBody className="text-center" placeholder={'none'}>
          <p color="blue-gray" className="mb-2 text-2xl text-black font-bold" >
            {name}
          </p>
          <p className="text-xl text-gray-800" >
            {explanation}
          </p>
        </CardBody>
        <CardFooter className="pt-0" children={''} placeholder={''}></CardFooter>
      </Card>
    );
  }