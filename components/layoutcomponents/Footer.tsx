"use client";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="w-full mt-7 max-w-7xl xl:max-w-[1400px] border-gray-300 border-t-2 !flex justify-between h-20 items-center p-3 mx-12 text-sm xl:!text-xl">
      <Link
        href="/aboutus"
        color="blue-gray"
        className="font-normal list-none transition-colors hover:text-blue-500 focus:text-blue-500"
      >
        Who we are
      </Link>

      
      <Link  className="font-normal list-none transition-colors hover:text-blue-500 focus:text-blue-500" href="/aboutus#FAQs">FAQs</Link>
      

      <Link
        href="https://patreon.com/MisinformationPlatform?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=creatorshare_creator&utm_content=join_link"
        color="blue-gray"
        className="font-normal list-none transition-colors hover:text-blue-500 focus:text-blue-500"
      >
        Donate
      </Link>

      <Link
        href="/submitclaim"
        color="blue-gray"
        className="font-normal list-none transition-colors hover:text-blue-500 focus:text-blue-500"
      >
        Submit A Claim
      </Link>
    </footer>
  );
}
