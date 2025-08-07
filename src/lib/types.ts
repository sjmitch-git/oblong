import { Document } from "@contentful/rich-text-types";

export type ShowcaseProps = {
  sys: { id: string };
  title: string;
  shortTitle: string;
  slug: string;
  description: string;
  body: {
    json: Document;
    links: {
      assets: {
        block: {
          sys: { id: string };
          url: string;
          description: string;
        }[];
      };
    };
  };
  date: string;
  author: string;
  image: { url: string };
};
