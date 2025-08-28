type Sys = {
  id: string;
};

type Image = {
  url: string;
};

type PortfolioBase = {
  title: string;
  shortTitle: string;
  description: string;
  slug: string;
  keywords: string[];
};

export type PortfolioProps = {
  sys: Sys;
} & PortfolioBase & {
    thumbnail: Image;
  };

export type PortfolioItemProps = {
  sys: Sys;
  body: string;
  heroImage: Image;
  hero_image_alt: string;
  url: string;
  npm: string;
  gitHub: string;
} & PortfolioBase;
