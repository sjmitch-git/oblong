import { Metadata } from "next";
import { getAllPortfolio, getPortfolioItem } from "@/lib/contentful/api";
import { PortfolioProps, PortfolioItemProps } from "@/lib/types";
import { Alert, Breadcrumbs } from "@/lib/fluid";
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
  };
}

export default async function PortfolioItemPage({ params }: PortfolioParamsProps) {
  const { slug } = await params;
  const article: PortfolioItemProps | undefined = await getPortfolioItem(slug);

  if (!article) {
    return (
      <div>
        <Alert status="error" message="Page not found" title="Oops!" />
      </div>
    );
  }

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
          className="w-full h-auto object-cover mb-12"
        />
      )}
      {article.body ? (
        <Markdown content={article.body} />
      ) : (
        <Alert status="warning" message="No content available" title="Content Missing" />
      )}
      <div className="cms-body prose prose-lg mx-auto dark:prose-invert">
        {article.url && (
          <div className="mt-8">
            <h2>Website</h2>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {article.shortTitle || article.title}
            </a>
          </div>
        )}
        {article.npm && (
          <div className="mt-8">
            <h2>NPM Package</h2>
            <a
              href={article.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {article.npm}
            </a>
          </div>
        )}
        {article.gitHub && (
          <div className="mt-8">
            <h2>GitHub</h2>
            <a
              href={article.gitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
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
    </>
  );
}
