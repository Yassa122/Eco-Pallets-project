import { GraphQLError } from "graphql/error";
import { FieldResolver } from "nexus";
import { Context } from "../../context";
import * as bcrypt from "bcrypt";

const signUp: FieldResolver<"Mutation", "signup"> = async (
  _,
  { email, password, userRole },
  ctx: Context,
) => {
  const { prisma } = ctx;

  // Check if the email is already registered
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new GraphQLError("Email is already registered.");
  }

  // Hash the password and create the user
  const hashedPassword = await bcrypt.hash(password, 10); // Ensure `password` is a valid string and not `undefined`
  const user = await prisma.user.create({
    data: {
      email,
      role: userRole,
      password: hashedPassword,
    },
  });

  // Ensure the user was created successfully
  if (!user) {
    throw new Error("Failed to create user.");
  }

  // If all goes well, return true
  return true;
};
export default signUp;
