const SHOWCASE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  shortTitle
  slug
  description
  body {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  date
  author
  image {
    url
  }
`;

async function fetchGraphQL(query, preview = false, tag = "showcase") {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: [tag] },
    }
  ).then((response) => response.json());
}

function extractShowcaseEntries(fetchResponse) {
  return fetchResponse?.data?.showcaseCollection?.items;
}

export async function getAllShowcases(limit = 3, isDraftMode = false) {
  const articles = await fetchGraphQL(
    `query {
        showcaseCollection(where:{slug_exists: true}, order: date_DESC, limit: ${limit}, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${SHOWCASE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
    "showcase"
  );
  return extractShowcaseEntries(articles);
}

export async function getShowcase(slug, isDraftMode = false) {
  const article = await fetchGraphQL(
    `query {
        showcaseCollection(where:{slug: "${slug}"}, limit: 1, preview: ${
      isDraftMode ? "true" : "false"
    }) {
          items {
            ${SHOWCASE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode,
    "showcase"
  );
  return extractShowcaseEntries(article)[0];
}
