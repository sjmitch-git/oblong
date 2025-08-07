import type { Metadata } from "next";
import Link from "next/link";

import { getAllShowcases } from "@/lib/contentful-api";
import { ShowcaseProps } from "@/lib/types";
import Hero from "@/components/Hero";
import { Breadcrumbs } from "@/lib/fluid";
import { BREADCRUMBS_SEPARATOR, BREADCRUMBS_SIZE, BREADCRUMBS_HOMELABEL } from "@/lib/constants";

const title = "Portfolio";
const description = "This page is under construction. Please check back later.";

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default async function PortfolioPage() {
  const showcases: ShowcaseProps[] = await getAllShowcases();

  return (
    <>
      <Breadcrumbs
        homeLabel={BREADCRUMBS_HOMELABEL}
        separator={BREADCRUMBS_SEPARATOR}
        size={BREADCRUMBS_SIZE}
      />
      <Hero title={title} description={description} />
      <div className="px-2 md:px-4 lg:px-0 pb-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {showcases.map((showcase: ShowcaseProps) => (
            <article
              key={showcase.sys.id}
              className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <h3 className="text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-50  py-4">
                {showcase.shortTitle}
              </h3>
              <div className="flex justify-end">
                <Link
                  className="inline-flex h-10 items-center justify-center text-sm font-medium"
                  href={`/portfolio/${showcase.slug}`}
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
