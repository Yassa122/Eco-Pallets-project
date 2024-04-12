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

const mutations = mutationType({
  definition(t) {},
});
export default mutations;
