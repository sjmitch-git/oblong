import { Metadata } from "next";
import Link from "next/link";
import { AppConfig } from "@/lib/config";
import { getAllPortfolio, getPortfolioItem } from "@/lib/contentful/api";
import { PortfolioProps, PortfolioItemProps } from "@/lib/types";
import { Alert, Breadcrumbs } from "@/lib/breeze";
import Hero from "@/components/Hero";
import Markdown from "@/components/ui/Markdown";
import { BREADCRUMBS_SEPARATOR, BREADCRUMBS_SIZE, BREADCRUMBS_HOMELABEL } from "@/lib/constants";

type Params = {
  slug: string;
};

type PortfolioParamsProps = {
  params: Promise<Params>;
};

export async function generateStaticParams() {
  const items = await getAllPortfolio();
  return items.map((item: PortfolioProps) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PortfolioParamsProps): Promise<Metadata> {
  const { slug } = await params;
  const article: PortfolioItemProps | undefined = await getPortfolioItem(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${AppConfig.baseUrl}portfolio/${slug}`,
      images: [
        {
          url: article.heroImage.url,
          alt: article.hero_image_alt,
          width: 1536,
          height: 923,
        },
      ],
    },
    twitter: {
      title: article.title,
      description: article.description,
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${AppConfig.baseUrl}portfolio/${slug}`,
    },
    other: {
      "og:logo": article.heroImage.url,
    },
  };
}

export default async function PortfolioItemPage({ params }: PortfolioParamsProps) {
  const { slug } = await params;
  const article: PortfolioItemProps | undefined = await getPortfolioItem(slug);
  const allItems = await getAllPortfolio();

  if (!article) {
    return (
      <div>
        <Alert status="error" message="Page not found" title="Oops!" />
      </div>
    );
  }

  const currentIndex = allItems.findIndex((item: PortfolioProps) => item.slug === slug);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <>
      <Breadcrumbs
        homeLabel={BREADCRUMBS_HOMELABEL}
        separator={BREADCRUMBS_SEPARATOR}
        size={BREADCRUMBS_SIZE}
        activeLabel={article.shortTitle || article.title}
      />
      <Hero title={article.title} description={article.description} />
      {article.heroImage && (
        <img
          src={article.heroImage.url}
          alt={article.hero_image_alt}
          className="w-full h-auto object-cover mb-12 px-2 md:px-4 lg:px-0"
        />
      )}
      {article.body ? (
        <Markdown content={article.body} />
      ) : (
        <Alert status="warning" message="No content available" title="Content Missing" />
      )}
      <div className="cms-body prose prose-lg mx-auto dark:prose-invert px-2 md:px-0">
        {article.url && (
          <div className="mt-8">
            <h2>Website</h2>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.shortTitle || article.title}
            </a>
          </div>
        )}
        {article.npm && (
          <div className="mt-8">
            <h2>NPM Package</h2>
            <a href={article.npm} target="_blank" rel="noopener noreferrer">
              {article.npm}
            </a>
          </div>
        )}
        {article.gitHub && (
          <div className="mt-8">
            <h2>GitHub</h2>
            <a href={article.gitHub} target="_blank" rel="noopener noreferrer">
              {article.gitHub}
            </a>
          </div>
        )}
        {article.keywords && article.keywords.length > 0 && (
          <div className="mt-4">
            <h2>Technologies</h2>
            <p>{article.keywords.join(", ")}</p>
          </div>
        )}
      </div>
      {/* Navigation Links */}
      <nav className="mt-12 flex justify-between prose prose-lg mx-auto dark:prose-invert border-t border-gray-500 px-4 md:px-0 py-6">
        <div>
          {prevItem && (
            <p>
              <strong className="block mb-2">Prev</strong>
              <Link rel="prev" className="text-lg md:text-2xl" href={`/portfolio/${prevItem.slug}`}>
                {prevItem.shortTitle || prevItem.title}
              </Link>
            </p>
          )}
        </div>
        <div>
          {nextItem && (
            <p className="text-right">
              <strong className="block mb-2">Next</strong>
              <Link rel="next" className="text-lg md:text-2xl" href={`/portfolio/${nextItem.slug}`}>
                {nextItem.shortTitle || nextItem.title}
              </Link>
            </p>
          )}
        </div>
      </nav>
    </>
  );
}
