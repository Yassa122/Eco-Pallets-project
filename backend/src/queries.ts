import { arg, intArg, nonNull, queryType, stringArg } from "nexus";

const queries = queryType({
  definition(t) {
    t.field("hello", {
      type: "String",
      resolve: () => "world",
    });
  }, // Add a comma here
});

export default queries;
