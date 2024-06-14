import "./globals.css";
import Navbar from "@/components/layoutcomponents/Navbar/Navbar";
import Footer from "@/components/layoutcomponents/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import React from "react";
import {DefaultSeo} from 'next-seo';
export const metadata = {
  title: "IllumiFact",
  description: "Fact-checking platform that corrects political misinformation and promotes critical thinking.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <head>
    <meta name="ahrefs-site-verification" content="7f7e4e7ae9050c1eb3f86cf393f066f2c31f7dddb05c655802d433df519e5162"/>
    <title>IlumiFact</title>
  </head>
  

      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col justify-between items-center">
          <Navbar/>
          {children}
          <Footer/>
          <SpeedInsights />
          <Analytics/>
        </main>
      </body>
    </html>
  );
}
