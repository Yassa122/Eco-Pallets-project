//yoga server setup
import { createYoga } from "graphql-yoga";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { createContext } from "../context";

const yoga = createYoga({
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
