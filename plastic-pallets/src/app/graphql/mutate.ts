import { GraphQLClient, Variables } from "graphql-request";
//process.env.BACKEND_URL ?? "http://localhost:3001";

const DEFAULT_API_URL = process.env.BACKEND_URL ?? "http://localhost:3000";

const graphqlUrl = `${DEFAULT_API_URL}/graphql`;

const graphQLClient = new GraphQLClient(graphqlUrl, {
  credentials: "include",
  mode: "cors",
});

const mutate = (mutation: string, variables?: Variables) => {
  const queryName = mutation.split("{")[1].split("(")[0].trim();

  return (
    graphQLClient
      .request(mutation, variables)
      //* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      .then((res: any) => {
        return res[queryName];
      })
      .catch((err) => {
        throw err.response.errors;
      })
  );
};

export default mutate;
