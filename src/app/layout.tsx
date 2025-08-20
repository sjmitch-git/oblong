import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { MetaData } from "@/lib/config";
import "@/styles/index.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = MetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark ${inter.className}`}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
