import type { Metadata } from "next";
import Link from "next/link";

import { getAllShowcases } from "@/lib/contentful-api";
import Hero from "@/components/Hero";

const title = "Portfolio";
const description = "This page is under construction. Please check back later.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

type ArticleProps = {
  title: string;
  shortTitle: string;
  slug: string;
  sys: {
    id: string;
  };
};

export default async function PortfolioPage() {
  const articles = await getAllShowcases();
  return (
    <>
      <Hero title={title} description={description} />
      <div className="px-2 md:px-4 lg:px-0 pb-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: ArticleProps) => (
            <article
              key={article.sys.id}
              className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <h3 className="text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-50  py-4">
                {article.shortTitle}
              </h3>
              <div className="flex justify-end">
                <Link
                  className="inline-flex h-10 items-center justify-center text-sm font-medium"
                  href={`/portfolio/${article.slug}`}
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
