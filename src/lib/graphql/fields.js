export const PORTFOLIO_SHARED_FIELDS = `
  sys {
    id
  }
  title
  shortTitle
  slug
  description
  keywords
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
  heroImage {
    url
  }
  gitHub
`;
