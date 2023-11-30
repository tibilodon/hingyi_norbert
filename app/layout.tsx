import "./globals.css";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import AppContextProvider from "@/utils/appContext";
import MobileNavbar from "@/components/navbar/mobile/MobileNavbar";
import PermanentBar from "@/components/permanentBar/PermanentBar";
const openSans = Open_Sans({ subsets: ["latin"] });

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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AppContextProvider>
          <div className={"nav"}>
            <PermanentBar />
            <MobileNavbar />
          </div>
          <div className={"content"}>{children}</div>
        </AppContextProvider>
      </body>
    </html>
  );
}
