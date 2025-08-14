import { fetchGraphQL } from "./client";
import { queryPortfolioList, queryPortfolioBySlug } from "../graphql/queries";

function extractPortfolioEntries(fetchResponse) {
  return fetchResponse?.data?.portfolioCollection?.items;
}

export async function getAllPortfolio(skip = 0, pageSize = 10, isDraftMode = false) {
  let allItems = [];
  let currentSkip = skip;

  try {
    while (true) {
      const variables = {
        skip: currentSkip,
        pageSize,
        preview: isDraftMode,
      };

      const data = await fetchGraphQL(queryPortfolioList, variables, isDraftMode, "portfolio");
      const items = extractPortfolioEntries(data);
      const total = data?.data?.portfolioCollection?.total || 0;

      allItems = [...allItems, ...items];

      if (items.length === 0 || allItems.length >= total) {
        break;
      }
      currentSkip += pageSize;
    }
  } catch (error) {
    console.error("Error fetching data:", {
      error: error.message,
      skip: currentSkip,
      pageSize,
      isDraftMode,
    });
    throw new Error(`Failed to fetch data: ${error.message}`);
  }

  if (allItems.length === 0) {
    console.warn(
      "No portfolio entries found in Contentful. Verify content model, slugs, API tokens, or preview mode settings."
    );
  }

  return allItems;
}

export async function getPortfolioItem(slug, isDraftMode = false) {
  try {
    const variables = {
      slug,
      preview: isDraftMode,
    };

    const data = await fetchGraphQL(queryPortfolioBySlug, variables, isDraftMode, "portfolio");
    const item = extractPortfolioEntries(data)[0];

    if (!item) {
      console.warn(
        `No article found for slug: ${slug} in ${isDraftMode ? "preview" : "published"} mode.`
      );
      return null;
    }

    return item;
  } catch (error) {
    console.error("Error fetching data:", {
      error: error.message,
      slug,
      isDraftMode,
    });
    throw new Error(`Failed to fetch data for slug ${slug}: ${error.message}`);
  }
}
