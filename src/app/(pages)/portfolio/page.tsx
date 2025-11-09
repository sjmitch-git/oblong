import type { Metadata } from "next";

import { AppConfig } from "@/lib/config";
import { getAllPortfolio } from "@/lib/contentful/api";
import { PortfolioProps } from "@/lib/types";
import Hero from "@/components/Hero";
import ListCard from "@/components/ui/ListCard";
import { Breadcrumbs } from "@/lib/breeze";
import { BREADCRUMBS_SEPARATOR, BREADCRUMBS_SIZE, BREADCRUMBS_HOMELABEL } from "@/lib/constants";

const title = "Portfolio";
const description =
  "A selection of projects utilizing React, Next.js, Gatsby, Angular, TailwindCSS, GraphQL, and AI.";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: `${AppConfig.baseUrl}portfolio`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}icon.png`,
        alt: `${AppConfig.name} logo`,
        width: 603,
        height: 603,
      },
    ],
  },
  twitter: {
    title: title,
    description: description,
    card: "summary_large_image",
  },
  alternates: {
    canonical: `${AppConfig.baseUrl}portfolio`,
  },
};

export default async function PortfolioPage() {
  const articles: PortfolioProps[] = await getAllPortfolio();

  return (
    <>
      <Breadcrumbs
        homeLabel={BREADCRUMBS_HOMELABEL}
        separator={BREADCRUMBS_SEPARATOR}
        size={BREADCRUMBS_SIZE}
      />
      <Hero title={title} description={description} />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-12 px-2 md:px-4 lg:px-0">
        {articles.map((article: PortfolioProps) => (
          <ListCard key={article.sys.id} {...article} />
        ))}
      </ul>
    </>
  );
}
