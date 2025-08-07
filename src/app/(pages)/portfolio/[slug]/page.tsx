import { Metadata } from "next";
import { getAllShowcases, getShowcase } from "@/lib/contentful-api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ShowcaseProps } from "@/lib/types";
import { Alert, Breadcrumbs } from "@/lib/fluid";
import Hero from "@/components/Hero";
import { BREADCRUMBS_SEPARATOR, BREADCRUMBS_SIZE, BREADCRUMBS_HOMELABEL } from "@/lib/constants";

type Params = {
  slug: string;
};

type PortfolioShowcaseProps = {
  params: Promise<Params>;
};

export async function generateStaticParams() {
  const allShowcases = await getAllShowcases();
  return allShowcases.map((showcase: ShowcaseProps) => ({
    slug: showcase.slug,
  }));
}

export async function generateMetadata({ params }: PortfolioShowcaseProps): Promise<Metadata> {
  const { slug } = await params;
  const showcase: ShowcaseProps | undefined = await getShowcase(slug);

  if (!showcase) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: showcase.title,
    description: showcase.description,
  };
}

export default async function PortfolioArticle({ params }: PortfolioShowcaseProps) {
  const { slug } = await params;
  const showcase: ShowcaseProps | undefined = await getShowcase(slug);

  if (!showcase) {
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
      />
      <Hero title={showcase.title} description={showcase.description} />
      <div className="cms-body">{documentToReactComponents(showcase.body.json)}</div>
    </>
  );
}
