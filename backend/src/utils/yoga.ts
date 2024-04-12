//yoga server setup
import { createYoga } from "graphql-yoga";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { createContext } from "../context";
import schema from "./schema";

const yoga = createYoga({
  schema,
  context: async (initialContext) => await createContext(initialContext),
  plugins: [
    useDisableIntrospection({
      isDisabled: (request) => {
        const isIntrospectionSecretPresent =
          request.headers.get("x-allow-introspection") ===
          process.env.introspectionSecret;
        return isIntrospectionSecretPresent;
      },
    }),
  ],
});

export default yoga;
