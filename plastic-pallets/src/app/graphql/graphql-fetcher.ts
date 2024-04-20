import { GraphQLClient, Variables } from "graphql-request";
//process.env.BACKEND_URL ?? "http://localhost:3001";

const DEFAULT_API_URL = process.env.BACKEND_URL ?? "http://localhost:3000";

const graphqlUrl = `${DEFAULT_API_URL}/graphql`;

const graphQLClient = new GraphQLClient(graphqlUrl, {
  credentials: "include",
  mode: "cors",
});

const graphqlFetcher = (query: string | string[], variables?: Variables) => {
  const queryString = Array.isArray(query) ? query[0] : query;
  const queryName = queryString
    .split("{")[1]
    .split("(")[0]
    .split("}")[0]
    .replace("\n", "")
    .trim();

  return (
    graphQLClient
      .request(queryString, variables)
      //* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      .then((res: any) => {
        return res[queryName];
      })
      .catch((err) => {
        // Check for GraphQL errors specifically
        if (err.response?.errors) {
          throw new Error(
            err.response.errors
              .map((e: { message: any }) => e.message)
              .join("\n")
          );
        } else if (err.response) {
          // Handle non-GraphQL errors but with a response
          throw new Error(
            `HTTP error: ${err.response.status} ${err.response.statusText}`
          );
        } else {
          // Handle network errors or other issues without a response
          throw new Error(err.message || "An unknown error occurred");
        }
      })
  );
};

export default graphqlFetcher;
