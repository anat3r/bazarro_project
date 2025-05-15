import type { Metadata } from "next";
import { Montserrat, Lato} from "next/font/google";
import "@/styles/globals.css";
import HeaderWrapper from "@/components/header/header";
import FooterWrapper from "@/components/footer/footer";
import Link from "next/link";
import { cookies } from "next/headers";
import { use } from "react";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ["100", "300" , "400" , "700" , "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: 'Bazarro', template: '%s | Bazarro' },
  description: "Shop at Bazarro",
};

const sections = [
  { 
    SectionName: "About",
    links: [
      { title: "Bazarro", link: "/" },
      { title: "Bazarro Share", link: "/" },
      { title: "Advertisement", link: "/" },
      { title: "Bazarro Ads", link: "/" },
      { title: "Bazarro API", link: "/" },
      { title: "Sustainable development", link: "/" },
      { title: "Digital Services", link: "/" }
    ] 
  },
  {
    SectionName: "Help center",
    links: [
      { title: "Help Center for buyers", link: "/" },
      { title: "Updates for buyers", link: "/" },
      { title: "Ask the Community", link: "/" },
      { title: "Help Center for sellers", link: "/" },
      { title: "Sell on Allegro", link: "/" },
      { title: "Purchase return", link: "/" },
      { title: "Social media privacy policy", link: "/" }
    ]
  },
  {
    SectionName: "Media",
    links: [
      { title: "Facebook", link: "https://www.facebook.com/" },
      { title: "X (Twitter)", link: "https://x.com/home/" },
      { title: "Instagram", link: "https://www.instagram.com/" },
      { title: "Youtube", link: "https://www.youtube.com/" },
    ]
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const savedTheme: string | undefined = use(cookies()).get('theme')?.value
  const initialTheme = savedTheme || "browser-theme"
  return (
    <html lang="en">
      <body
        className={`${initialTheme} ${montserrat.className} ${lato.className} antialiased flex flex-col items-center justify-center`} suppressHydrationWarning
      >
        <div className="w-full max-w-[1440px] min-h-screen h-fit bg-[var(--page-bg)] flex flex-col justify-start">
          <div className="self-stretch bg-[var(--page-bg)] border-b-2 border-[var(--border-color)] flex flex-col justify-start items-center overflow-hidden">
            <Link target="_blank" href="https://www.thedrum.com/the-worlds-best-ads-all-time" className="justify-start text-border-dark text-3xl font-normal font-['Lato']">Best add placer</Link>
          </div>
          <HeaderWrapper />
          <div className="min-h-fit flex-1 self-stretch flex justify-center items-start">
            <main className="flex-1 max-w-[1440px] py-4 bg-[var(--page-bg)] flex flex-col justify-start items-start overflow-hidden">
              {children}
            </main>
          </div>
          <FooterWrapper sections={sections} />
        </div>
      </body>
    </html>
  );
}
