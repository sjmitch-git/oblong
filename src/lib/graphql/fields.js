export const PORTFOLIO_SHARED_FIELDS = `
  sys {
    id
  }
  title
  shortTitle
  slug

`;

export const PORTFOLIO_LIST_FIELDS = `
  ${PORTFOLIO_SHARED_FIELDS}
  thumbnail {
    url
  }
`;

export const PORTFOLIO_ITEM_FIELDS = `
  ${PORTFOLIO_SHARED_FIELDS}
  description
  url
  body
  keywords
  heroImage {
    url
  }
  gitHub
`;
