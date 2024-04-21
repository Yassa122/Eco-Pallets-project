import { GraphQLError } from "graphql/error";
import bcrypt from "bcrypt";
import { FieldResolver } from "nexus";

import { Context } from "../../context";

const login: FieldResolver<"Mutation", "login"> = async (
  _,
  { email, password }, // Destructured for clarity
  ctx: Context,
) => {
  const { prisma, req, res } = ctx as Context & { req: any; res: any };

  // Validate input
  if (!email) {
    throw new GraphQLError("Email is required");
  }

  // Retrieve user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new GraphQLError("User not found");
  }

  // Password-based authentication
  if (!user.password) {
    throw new GraphQLError(
      "Password not set for this user, please contact support.",
    );
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new GraphQLError("Invalid password");
  }

  return {}; // Assuming the client expects an object
};

export default login;
