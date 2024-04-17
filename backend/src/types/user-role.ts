import { enumType } from "nexus";

const UserRoleEnum = enumType({
  name: "UserRole",
  members: ["USER", "user", "ADMIN", "MANAGER", "GUEST"], // Adjusted to match Prisma enum
});

export default UserRoleEnum;
