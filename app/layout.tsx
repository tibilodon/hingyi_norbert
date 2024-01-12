import "./globals.css";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import AppContextProvider from "@/utils/appContext";
import MobileNavbar from "@/components/navbar/mobile/MobileNavbar";
import RegularNavbar from "@/components/navbar/regular/RegularNavbar";
import PermanentBar from "@/components/permanentBar/PermanentBar";
import { supaCreateServerComponentClient } from "@/utils/supabaseClient";
import Loading from "./loading";
import Footer from "@/components/footer/Footer";
import CMSSidebar from "@/components/CMS/sidebar/CMSSidebar";
//supabase

const openSans = Open_Sans({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Burkoló - Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  metadataBase: new URL("https://hingyi-norbert.vercel.app/api/og"),
  openGraph: {
    title: "Burkoló - Hingyi Norbert",
    description: "Hingyi Norbert - Burkoló oldala",
    images: [
      {
        url: "https://hingyi-norbert.vercel.app/api/og",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const getBarData = async () => {
  const supabase = await supaCreateServerComponentClient();
  const { data: data } = await supabase.from("Miscellaneous").select();
  return data;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getBarData();

  if (!data) {
    return <Loading />;
  }
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AppContextProvider data={data}>
          <div className={"nav"}>
            <PermanentBar data={data} />
            <div className={"mobileNav"}>
              <MobileNavbar data={data} />
            </div>
            <div className={"regularNav"}>
              <RegularNavbar />
            </div>
          </div>
          <div className={"content"}>{children}</div>
          <Footer data={data} />
          <CMSSidebar />
        </AppContextProvider>
      </body>
    </html>
  );
}
