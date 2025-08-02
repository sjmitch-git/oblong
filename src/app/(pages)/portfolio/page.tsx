import type { Metadata } from "next";

import Hero from "@/components/Hero";

const title = "Portfolio";
const description = "A selection of projects...";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function PortfolioPage() {
  return (
    <>
      <Hero title={title} description={description} />
      <div className="px-2 md:px-4 lg:px-0 pb-12 max-w-prose mx-auto">Page under construction.</div>
    </>
  );
}
