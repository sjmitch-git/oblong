import type { Metadata } from "next";

import { AppConfig } from "@/lib/config";
import { getAllPortfolio } from "@/lib/contentful/api";
import { PortfolioProps } from "@/lib/types";
import Hero from "@/components/Hero";
import ListCard from "@/components/ui/ListCard";
import { Breadcrumbs } from "@/lib/fluid";
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
  console.log("articles", articles);

  return (
    <>
      <Breadcrumbs
        homeLabel={BREADCRUMBS_HOMELABEL}
        separator={BREADCRUMBS_SEPARATOR}
        size={BREADCRUMBS_SIZE}
      />
      <Hero title={title} description={description} />
      <div className="px-2 md:px-4 lg:px-0 pb-12 mx-auto">
        <div className="grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {articles.map((article: PortfolioProps) => (
            <ListCard
              key={article.sys.id}
              title={article.title}
              link={`/portfolio/${article.slug}`}
              image={article.thumbnail?.url}
            />
          ))}
        </div>
      </div>
    </>
  );
}
