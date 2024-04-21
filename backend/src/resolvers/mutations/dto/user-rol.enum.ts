import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
  user = "user",
  USER = "USER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  GUEST = "GUEST",
}

registerEnumType(UserRole, {
  name: "UserRole", // This will be used in the GraphQL schema
});
