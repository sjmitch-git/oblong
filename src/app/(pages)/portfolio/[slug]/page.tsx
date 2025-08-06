import { Metadata } from "next";
import { getArticle, getAllArticles } from "@/lib/contentful-api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Hero from "@/components/Hero";

type ArticleProps = {
  title: string;
  slug: string;
  description: string;
  body: {
    json: Document;
  };
  sys: {
    id: string;
  };
};

type Params = {
  slug: string;
};

type PortfolioArticleProps = {
  params: Promise<Params>;
};

export async function generateStaticParams() {
  const allArticles = await getAllArticles();

  return allArticles.map((article: ArticleProps) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PortfolioArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  return {
    title: article.title,
    description: article.description,
  };
}

export default async function PortfolioArticle({ params }: PortfolioArticleProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return (
    <main>
      <Hero title={article.title} description={article.description} />
      <div className="">{documentToReactComponents(article.body.json)}</div>
    </main>
  );
}
