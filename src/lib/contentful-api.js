const SHOWCASES_GRAPHQL_FIELDS = `
  sys {
    id
  }
  shortTitle
  slug
  date
`;

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

export async function fetchGraphQL(query, preview = false, tag = "showcase") {
  const response = await fetch(
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
  );

  if (!response.ok) {
    console.error(`Contentful API error: ${response.status} ${response.statusText}`);
    throw new Error(`Contentful API request failed: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    console.error("Contentful GraphQL errors:", JSON.stringify(data.errors, null, 2));
    throw new Error("Contentful GraphQL query failed");
  }

  return data;
}

function extractShowcaseEntries(fetchResponse) {
  return fetchResponse?.data?.showcaseCollection?.items;
}

export async function getAllShowcases(isDraftMode = false) {
  let allShowcases = [];
  let skip = 0;
  const pageSize = 100;

  try {
    while (true) {
      const showcases = await fetchGraphQL(
        `query {
          showcaseCollection(where:{slug_exists: true}, order: date_DESC, skip: ${skip}, limit: ${pageSize}, preview: ${
          isDraftMode ? "true" : "false"
        }) {
            items {
             ${SHOWCASES_GRAPHQL_FIELDS}
            }
            total
          }
        }`,
        isDraftMode,
        "showcase"
      );

      const items = extractShowcaseEntries(showcases);
      allShowcases = [...allShowcases, ...items];

      const total = showcases?.data?.showcaseCollection?.total || 0;
      if (items.length === 0 || allShowcases.length >= total) {
        break;
      }
      skip += pageSize;
    }
  } catch (error) {
    console.error("Error fetching showcases:", error);
    throw error;
  }

  if (allShowcases.length === 0) {
    console.warn(
      "No showcase entries found in Contentful. Check content model fields, slugs, API tokens, or preview mode."
    );
  }

  return allShowcases;
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
