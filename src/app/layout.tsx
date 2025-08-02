import { MetaData } from "@/lib/config";
import "@/styles/index.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = MetaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-light">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
