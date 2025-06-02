import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Oblong",
  description: "IT and web services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-primary">
        <main className="flex-grow container mx-auto max-w-4xl pt-12 pb-12 px-0">{children}</main>
      </body>
    </html>
  );
}
