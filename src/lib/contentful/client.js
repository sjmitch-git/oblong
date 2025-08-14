export async function fetchGraphQL(query, variables = {}, preview = false, tag = "portfolio") {
  try {
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
        body: JSON.stringify({ query, variables }),
        next: { tags: [tag] },
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No response text");
      console.error(`Contentful API error: ${response.status} ${response.statusText}`, {
        status: response.status,
        statusText: response.statusText,
        response: errorText,
      });
      throw new Error(`Contentful API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (data.errors) {
      console.error("Contentful GraphQL errors:", {
        errors: JSON.stringify(data.errors, null, 2),
        query,
        variables,
      });
      throw new Error("Contentful GraphQL query failed: " + JSON.stringify(data.errors));
    }

    return data;
  } catch (error) {
    console.error("fetchGraphQL error:", {
      message: error.message,
      query,
      variables,
      preview,
      tag,
    });
    throw error;
  }
}
