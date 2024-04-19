// src/types/User.ts
import { UserRole } from "@prisma/client";
import { objectType } from "nexus";

const user = objectType({
  name: "user",
  definition(t) {
    t.id("id");
    t.string("email");
    t.string("password");
    t.field("role", { type: user }); // Assuming UserRole is an enum you've defined
    // Define other fields as necessary
  },
});

export default user;
