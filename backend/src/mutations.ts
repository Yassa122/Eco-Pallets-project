import {
  arg,
  booleanArg,
  floatArg,
  intArg,
  list,
  mutationType,
  nonNull,
  stringArg,
} from "nexus";
import { objectType, extendType } from "nexus";
import UserRoleEnum from "./types/user-role";
import signUp from "./resolvers/mutations/signup";

const mutations = mutationType({
  definition(t) {
    t.field("signUp", {
      type: "Boolean",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        userRole: nonNull(arg({ type: UserRoleEnum })),
      },
      resolve: signUp,
    });
  },
});
export default mutations;
