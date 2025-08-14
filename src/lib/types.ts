type Sys = {
  id: string;
};

type Image = {
  url: string;
};

type PortfolioBase = {
  title: string;
  shortTitle: string;
  slug: string;
};

export type PortfolioProps = {
  sys: Sys;
} & PortfolioBase & {
    thumbnail: Image;
  };

export type PortfolioItemProps = {
  sys: Sys;
  description: string;
  body: string;
  heroImage: Image;
  hero_image_alt: string;
  url: string;
  keywords: string[];
  gitHub: string;
} & PortfolioBase;
