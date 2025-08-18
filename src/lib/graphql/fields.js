export const PORTFOLIO_SHARED_FIELDS = `
  sys {
    id
  }
  title
  shortTitle
  slug
  description
`;

export const PORTFOLIO_LIST_FIELDS = `
  ${PORTFOLIO_SHARED_FIELDS}
  thumbnail {
    url
  }
`;

export const PORTFOLIO_ITEM_FIELDS = `
  ${PORTFOLIO_SHARED_FIELDS}
  url
  npm
  body
  keywords
  heroImage {
    url
  }
  gitHub
`;
