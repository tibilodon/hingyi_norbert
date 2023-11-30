import "./globals.css";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import AppContextProvider from "@/utils/appContext";
// import ez from "./opengraph-image.png";
import ez from "@/public/opengraph-image.png";
// import MobileNavbar from "@/components/navbar/mobile/MobileNavbar";
import MobileNavbar from "@/components/navbar/mobile/MobileNavbar";
import PermanentBar from "@/components/permanentBar/PermanentBar";
const openSans = Open_Sans({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Burkoló - Hingyi Norbert",
//   description: "Hingyi Norbert - Burkoló oldala",
//   openGraph: {
//     title: "Hingyi Norbert | Burkoló",
//     description: "Hingyi Norbert | Burkoló",
//     // url: 'https://nextjs.org',
//     // siteName: 'Next.js',
//     images: [
//       {
//         url: "./opengraph-image.png",
//         width: 800,
//         height: 600,
//       },
//       {
//         url: "./opengraph-image.png",
//         width: 1800,
//         height: 1600,
//         alt: "My custom alt",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
// };
export const metadata: Metadata = {
  title: "Burkoló - Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
  openGraph: {
    title: "Burkoló - Hingyi Norbert",
    description: "Hingyi Norbert - Burkoló oldala",
    images: [
      {
        url: ez.src,
        // width: 1200,
        // height: 630,
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
