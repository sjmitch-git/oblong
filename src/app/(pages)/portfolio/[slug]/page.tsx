import { getArticle, getAllArticles } from "@/lib/contentful-api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Hero from "@/components/Hero";

type ArticleProps = {
  title: string;
  slug: string;
  sys: {
    id: string;
  };
};

type Params = {
  slug: string;
};

type PortfolioArticleProps = {
  params: Params;
};

export async function generateStaticParams() {
  const allArticles = await getAllArticles();

  return allArticles.map((article: ArticleProps) => ({
    slug: article.slug,
  }));
}

export default async function PortfolioArticle({ params }: PortfolioArticleProps) {
  const article = await getArticle(params.slug);
  console.log("Article:", article);
  return (
    <main>
      <Hero title={article.title} description={article.description} />
      <div className="">{documentToReactComponents(article.body.json)}</div>
    </main>
  );
}
