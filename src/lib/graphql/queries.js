import { PORTFOLIO_LIST_FIELDS, PORTFOLIO_ITEM_FIELDS } from "./fields";

export const queryPortfolioList = `
  query PortfolioList($skip: Int!, $pageSize: Int!, $preview: Boolean!) {
    portfolioCollection(
      where: { slug_exists: true }
      order: sys_firstPublishedAt_DESC
      skip: $skip
      limit: $pageSize
      preview: $preview
    ) {
      items {
        ${PORTFOLIO_LIST_FIELDS}
      }
      total
    }
  }
`;

export const queryPortfolioBySlug = `
  query PortfolioBySlug($slug: String!, $preview: Boolean!) {
    portfolioCollection(where: { slug: $slug }, limit: 1, preview: $preview) {
      items {
        ${PORTFOLIO_ITEM_FIELDS}
      }
    }
  }
`;
